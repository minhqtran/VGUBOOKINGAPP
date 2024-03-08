using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using NetUtility;
using BookingApp.Constants;
using BookingApp.Data;
using BookingApp.DTO;
using BookingApp.Helpers;
using BookingApp.Models;
using BookingApp.Services.Base;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Syncfusion.JavaScript;
using Syncfusion.JavaScript.DataSources;
using OfficeOpenXml.FormulaParsing.LexicalAnalysis;
using BookingApp.DTO.Filter;
using BookingApp.DTO.auth;

namespace BookingApp.Services
{
    public interface IUserService : IServiceBase<User, UserDto>
    {
        Task<OperationResult> CheckExistLdap(string ldapName);
        Task<OperationResult> LoginAsync(UserForLoginDto userForLoginDto);
        Task<List<UserDto>> SearchUser(UserFilter userFilter);
    }
    public class UserService : ServiceBase<User, UserDto>, IUserService
    {
        private readonly IRepositoryBase<User> _repo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IWebHostEnvironment _currentEnvironment;
        private readonly IAuthService _authService;
        public UserService(
            IRepositoryBase<User> repo,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            MapperConfiguration configMapper,
            IHttpContextAccessor httpContextAccessor,
            IWebHostEnvironment currentEnvironment,
            IAuthService authService
            )
            : base(repo, unitOfWork, mapper, configMapper)
        {
            _repo = repo;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _configMapper = configMapper;
            _httpContextAccessor = httpContextAccessor;
            _currentEnvironment = currentEnvironment;
            _authService = authService;
        }

        public override async Task<OperationResult> UpdateAsync(UserDto model)
        {
            try
            {
                var item = await _repo.FindByIDAsync(model.ID);
                _repo.Update(item);

                await _unitOfWork.SaveChangeAsync();
                var result = _mapper.Map<UserDto>(item);

                operationResult = new OperationResult
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = MessageReponse.UpdateSuccess,
                    Success = true,
                    Data = result
                };
            }
            catch (Exception ex)
            {
                operationResult = ex.GetMessageError();
            }
            return operationResult;
        }
        public async Task<OperationResult> CheckExistLdap(string ldapName)
        {
            var item = await _repo.FindAll(x => x.LdapName == ldapName && x.Status).FirstOrDefaultAsync();
            if (item != null)
            {
                return new OperationResult { 
                    StatusCode = HttpStatusCode.OK, 
                    Message = "The account already existed!", 
                    Success = true ,
                    Data = item };
            }
            operationResult = new OperationResult
            {
                StatusCode = HttpStatusCode.OK,
                Success = false,
                Data = item
            };
            return operationResult;
        }
        public override async Task<List<UserDto>> GetAllAsync()
        {
            var query = _repo.FindAll(x => x.Status).ProjectTo<UserDto>(_configMapper);

            var data = await query.ToListAsync();
            return data;
        }
        public override async Task<OperationResult> AddAsync(UserDto model)
        {
            try
            {
                var item = _mapper.Map<User>(model);
                item.Status = true;
                item.Password = item.Password.ToSha512();
                item.LdapLogin = false;
                item.Guid = Guid.NewGuid().ToString("N") + DateTime.Now.ToString("ssff").ToUpper();
                _repo.Add(item);
                await _unitOfWork.SaveChangeAsync();
                operationResult = new OperationResult
                {
                    StatusCode = HttpStatusCode.OK,
                    Message = MessageReponse.AddSuccess,
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

        public override async Task<OperationResult> DeleteAsync(int id)
        {
            try
            {
                var item = await _repo.FindByIDAsync(id);
                _repo.Remove(item);
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
        
        public async Task<List<UserDto>> SearchUser(UserFilter userFilter)
        {
            var query = _repo.FindAll().ProjectTo<UserDto>(_configMapper);
            if (!string.IsNullOrWhiteSpace(userFilter.Department))
            {
                query = query.Where(x => x.Department == userFilter.Department);
            }
            if (userFilter.Role != 0)
            {
                query = query.Where( x => x.Role == userFilter.Role);
            }
            if (userFilter.LDapLogin)
            {
                query = query.Where(x => x.LdapLogin == userFilter.LDapLogin);
            }
            var data = await query.ToListAsync();
            return data;
        }
        public async Task<OperationResult> LoginAsync(UserForLoginDto userForLoginDto)
        {
            return await _authService.NewLoginAsync(userForLoginDto);
        }
    }
}
