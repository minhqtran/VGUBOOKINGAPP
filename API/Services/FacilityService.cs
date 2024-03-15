using AutoMapper;
using BookingApp.Data;
using BookingApp.DTO;
using BookingApp.Models;
using BookingApp.Services.Base;

namespace BookingApp.Services
{
    public interface IfacilityService:IServiceBase<Facility, FacilityDto>
    {

    }
    public class FacilityService : ServiceBase<Facility, FacilityDto>, IfacilityService
    {
        private readonly IRepositoryBase<Facility> _repo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public FacilityService (
                       IRepositoryBase<Facility> repo,
                                  IUnitOfWork unitOfWork,
                                             IMapper mapper,
                                                        MapperConfiguration configMapper
                   ) : base(repo, unitOfWork, mapper, configMapper)
        {
            _repo = repo;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _configMapper = configMapper;
        }
    }
}
