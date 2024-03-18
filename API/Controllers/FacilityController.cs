using BookingApp.DTO;
using BookingApp.DTO.Filter;
using BookingApp.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace BookingApp.Controllers
{
    public class FacilityController : ApiControllerBase
    {
        private readonly IFacilityService _service;
        public FacilityController(IFacilityService service)
        {
            _service = service;
        }
        [HttpGet]
        public async Task<ActionResult> GetAllAsync()
        {
            return Ok(await _service.GetAllAsync());
        }
        [HttpPost]
        public async Task<ActionResult> AddAsync(FacilityDto model)
        {
            return Ok(await _service.AddAsync(model));
        }

    }
}
