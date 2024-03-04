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
using Quartz.Util;
using Syncfusion.JavaScript;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace BookingApp.Services
{
    public interface IRoomService : IServiceBase<Room, RoomDto>
    {

        Task<object> LoadData(DataManager data, string farmGuid);
        Task<object> GetAudit(object id);
        Task<OperationResult> AddFormAsync(RoomDto model);
        Task<object> GetSitesByAccount();
        Task<object> CheckRoom();
        Task<List<RoomDto>> SearchRoom(RoomFilter roomFilter);
    }
    public class RoomService : ServiceBase<Room, RoomDto>, IRoomService
    {
        private readonly IRepositoryBase<Room> _repo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public RoomService(
                       IRepositoryBase<Room> repo,
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
        public override async Task<List<RoomDto>> GetAllAsync()
        {
            var query = _repo.FindAll(x => x.Status).ProjectTo<RoomDto>(_configMapper);

            var data = await query.ToListAsync();
            return data;
        }

        public async Task<List<RoomDto>> SearchRoom(RoomFilter roomFilter)
        {
            var query = _repo.FindAll().ProjectTo<RoomDto>(_configMapper);
            if (!string.IsNullOrWhiteSpace(roomFilter.BuildingGUID))
            {
                query = query.Where(x => x.BuildingGUID == roomFilter.BuildingGUID);
            }
            if (!string.IsNullOrWhiteSpace(roomFilter.FloorGUID))
            {
                query = query.Where(x => x.FloorGUID == roomFilter.FloorGUID);
            }
            if (!string.IsNullOrWhiteSpace(roomFilter.CampusGUID))
            {
                query = query.Where(x => x.CampusGUID == roomFilter.CampusGUID);
            }
            if (!string.IsNullOrWhiteSpace(roomFilter.RoomGUID))
            {
                query = query.Where(x => x.RoomGuid == roomFilter.RoomGUID);
            }
            var data = await query.ToListAsync();
            return data;

        }
        public override async Task<OperationResult> AddAsync(RoomDto model)
        {
            try
            { 
                var item = _mapper.Map<Room>(model);
                item.Status = true;
                item.RoomGuid = Guid.NewGuid().ToString("N") + DateTime.Now.ToString("ssff").ToUpper(); 
                _repo.Add(item);
                await _unitOfWork.SaveChangeAsync();

                operationResult = new OperationResult
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = MessageReponse.AddSuccess,
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
        public async Task<object> GetSitesByAccount() 
        {
            throw new System.NotImplementedException();
        }// ?? not implemented

        public async Task<object> CheckRoom()
        {
            throw new System.NotImplementedException();
        }// ?? not implemented

        public async Task<OperationResult> AddFormAsync(RoomDto model)
        {
            throw new System.NotImplementedException();
        }// ?? not implemented

        public async Task<object> GetAudit(object id)
        {
            throw new System.NotImplementedException();
        }// ?? not implemented

        public async Task<object> LoadData(DataManager data, string farmGuid)
        {
            throw new System.NotImplementedException();
        }// ?? not implemented

        public async Task<object> DeleteUploadFile(int key)
        {
            var item = _repo.FindByID(key);
            item.Status = false;
            _repo.Update(item);
            try
            {
                await _unitOfWork.SaveChangeAsync();
                operationResult = new OperationResult
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = MessageReponse.DeleteSuccess,
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

        public override async Task<OperationResult> DeleteAsync(int id) {
            var item = _repo.FindByID(id);
            //item.CancelFlag = "Y";
            item.Status = false;
            _repo.Update(item);
            try
            {
                await _unitOfWork.SaveChangeAsync();
                operationResult = new OperationResult
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = MessageReponse.DeleteSuccess,
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
