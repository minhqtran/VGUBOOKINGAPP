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

namespace BookingApp.Services
{
    public interface IUserService : IServiceBase<User, UserDto>
    {
        Task<OperationResult> CheckExistLdap(string ldapName);
    }
    public class UserService : ServiceBase<User, UserDto>, IUserService
    {
        private readonly IRepositoryBase<User> _repo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IWebHostEnvironment _currentEnvironment;

        public UserService(
            IRepositoryBase<User> repo,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            MapperConfiguration configMapper,
            IHttpContextAccessor httpContextAccessor,
            IWebHostEnvironment currentEnvironment
            )
            : base(repo, unitOfWork, mapper, configMapper)
        {
            _repo = repo;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _configMapper = configMapper;
            _httpContextAccessor = httpContextAccessor;
            _currentEnvironment = currentEnvironment;
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
            var item = await _repo.FindAll(x => x.Ldap_Name == ldapName && x.Status).FirstOrDefaultAsync();
            if (item != null)
            {
                return new OperationResult { StatusCode = HttpStatusCode.OK, Message = "The account already existed!", Success = true , Data = item };
            }
            operationResult = new OperationResult
            {
                StatusCode = HttpStatusCode.OK,
                Success = false,
                Data = item
            };
            return operationResult;
        }
    }
}
