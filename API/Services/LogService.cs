using AutoMapper;
using AutoMapper.QueryableExtensions;
using BookingApp.Data;
//using BookingApp.Dto;
using BookingApp.DTO;
using BookingApp.Models;
using BookingApp.Services.Base;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using Syncfusion.JavaScript;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookingApp.Services
{

    public interface ILogService : IServiceBase<Log, LogDto>
    {


    }
    public class LogService : ServiceBase<Log, LogDto>, ILogService
    {
        private readonly IRepositoryBase<Log> _repo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        private readonly IWebHostEnvironment _currentEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public LogService(
            IRepositoryBase<Log> repo,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IWebHostEnvironment currentEnvironment,
            IHttpContextAccessor httpContextAccessor,
            MapperConfiguration configMapper
            )
            : base(repo, unitOfWork, mapper, configMapper)
        {
            _repo = repo;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _configMapper = configMapper;
            _currentEnvironment = currentEnvironment;
            _httpContextAccessor = httpContextAccessor;
        }
        public override async Task<List<LogDto>> GetAllAsync()
        {
            var item = _repo.FindAll().ProjectTo<LogDto>(_configMapper);
            return await item.ToListAsync();
        }
    }

}
