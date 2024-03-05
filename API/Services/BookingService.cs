using AutoMapper;
using AutoMapper.QueryableExtensions;
using BookingApp.Constants;
using BookingApp.Data;
using BookingApp.DTO;
using BookingApp.DTO.Filter;
using BookingApp.Helpers;
using BookingApp.Models;
using BookingApp.Services.Base;
using Microsoft.EntityFrameworkCore;
using Syncfusion.JavaScript;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace BookingApp.Services
{
    public interface IBookingService : IServiceBase<Booking, BookingDto>
    {
        Task<List<BookingDto>> ConflictChecking(BookingDto model);
        Task<OperationResult> Disable(int id);
        Task<OperationResult> UpdateStatus(int id, decimal bookingStatus);
        Task<List<BookingDto>> SearchBooking(BookingFilter bookingFilter);
    }

    public class BookingService : ServiceBase<Booking, BookingDto>, IBookingService
    {
        private readonly IRepositoryBase<Booking> _repo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public BookingService(
                       IRepositoryBase<Booking> repo,
                                  IUnitOfWork unitOfWork,
                                             IMapper mapper,
                                                        MapperConfiguration configMapper
                       )
            : base(repo, unitOfWork, mapper, configMapper)
        {
            _repo = repo;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _configMapper = configMapper;
        }

        public override async Task<List<BookingDto>> GetAllAsync()
        {
            var query = _repo.FindAll(x => x.Status).ProjectTo<BookingDto>(_configMapper);
            var data = await query.ToListAsync();
            return data;
        }
        public async Task<List<BookingDto>> SearchBooking(BookingFilter bookingFilter) { //missing compare date
            var query = _repo.FindAll().ProjectTo<BookingDto>(_configMapper);
            if (!string.IsNullOrEmpty(bookingFilter.CampusGuid))
            {
                query = query.Where(x => x.CampusGuid == bookingFilter.CampusGuid);
            }
            if (!string.IsNullOrEmpty(bookingFilter.BuildingGuid))
            {
                query = query.Where(x => x.BuildingGuid == bookingFilter.BuildingGuid);
            }
            if (!string.IsNullOrEmpty(bookingFilter.FloorGuid))
            {
                query = query.Where(x => x.FloorGuid == bookingFilter.FloorGuid);
            }
            if (!string.IsNullOrEmpty(bookingFilter.RoomGuid))
            {
                query = query.Where(x => x.RoomGuid == bookingFilter.RoomGuid);
            }
            // add more filter here
            var data = await query.ToListAsync();
            return data;


        }
        public override async Task<OperationResult> AddAsync(BookingDto model) 
        {
            try {
                var item = _mapper.Map<Booking>(model);
                var conflictBooking = ConflictChecking(model);
            if (conflictBooking.Result.Count > 0) { 
                return new OperationResult
                {
                    StatusCode = HttpStatusCode.OK, // ?? should it be ok ?
                    Message = MessageReponse.BookingErrorTimeConflict,
                    Success = false,
                    Data = conflictBooking.Result
                };
            }
            
            item.Status = true; //set status to true
            item.BookingStatus = BookingStatus.Pending; //set booking status to pending
            item.BookingGuid = Guid.NewGuid().ToString() + DateTime.Now.ToString("ssff").ToUpper();
            item.BookingTimeS = item.StartDate.ToString("HH:mm"); // convert start date to string
            item.BookingTimeE = item.EndDate.ToString("HH:mm"); // convert end date to string
            _repo.Add(item);
            await _unitOfWork.SaveChangeAsync();

            operationResult = new OperationResult
            {
                StatusCode = HttpStatusCode.OK,
                Message = MessageReponse.BookingSuccess,
                Success = true,
                Data = model
            };
            }
            catch (Exception ex)
            {
                operationResult = ex.GetMessageError();
            }
            return operationResult;


        }
        public async Task<OperationResult> UpdateStatus(int id, decimal bookingStatus) // function for admin to change booking status
        {
            var item = _repo.FindByID(id);
            item.BookingStatus = bookingStatus;
            _repo.Update(item);
            try
            {
                await _unitOfWork.SaveChangeAsync();
                operationResult = new OperationResult
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = MessageReponse.UpdateSuccess,
                    Success = true,
                    Data = item
                };
            }
            catch (Exception ex)
            {
                operationResult = ex.GetMessageError();
            }
            return operationResult;
        }   
        public async Task<List<BookingDto>> ConflictChecking(BookingDto model) //Logic checking for Room Booking
        {
            var query = _repo.FindAll().ProjectTo<BookingDto>(_configMapper);
            var item = _mapper.Map<Booking>(model);
            var conflictBooking = query.Where(x =>
                x.Status == true && // only check active booking (x.Status could be changed to x.bookingStatus)
                x.CampusGuid == item.CampusGuid && // check campus conflict
                x.BuildingGuid == item.BuildingGuid && // check building conflict
                x.FloorGuid == item.FloorGuid && // check floor conflict
                x.RoomGuid == item.RoomGuid && // check room conflict
                (x.StartDate <= item.StartDate && item.StartDate < x.EndDate || // check start date conflict, if the start date of the new booking is between the start and end date of the existing booking
                x.StartDate < item.EndDate && item.EndDate <= x.EndDate)) // check end date conflict, if the end date of the new booking is between the start and end date of the existing booking
                    .ToListAsync();
            return await conflictBooking;
        }
        public async Task<OperationResult> Disable(int id) // function for admin to disable the Status of the booking - similar to delete but not actually delete from database
        {
            var item = _repo.FindByID(id);
            item.Status = false;
            
            _repo.Update(item);
            try
            {
                await _unitOfWork.SaveChangeAsync();
                operationResult = new OperationResult
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = MessageReponse.DisableSuccess,
                    Success = true,
                    Data = item
                };
            }
            catch (Exception ex)
            {
                operationResult = ex.GetMessageError();
            }
            return operationResult;
        }
    }
}
