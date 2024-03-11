using BookingApp.DTO;
using BookingApp.DTO.Filter;
using BookingApp.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BookingApp.Controllers
{
    public class BookingController : ApiControllerBase
    {
        private readonly IBookingService _service;
        public BookingController(IBookingService service)
        {
            _service = service;
        }
        [HttpGet]
        public async Task<ActionResult> GetAllAsync()
        {
            return Ok(await _service.GetAllAsync());
        }
        [HttpGet]
        public async Task<ActionResult> GetByIDAsync(int id)
        {
            return Ok(await _service.GetByIDAsync(id));
        }
        [HttpGet]
        public async Task<ActionResult> SearchBooking([FromQuery] BookingFilter bookingFilter)
        {
            return Ok(await _service.SearchBooking(bookingFilter));
        }
        [HttpPost]
        public async Task<ActionResult> AddAsync([FromBody] BookingDto model)
        {
            return Ok(await _service.AddAsync(model));
        }
        [HttpPut]
        public async Task<ActionResult> UpdateAsync([FromBody] BookingDto model)
        {
            return Ok(await _service.UpdateAsync(model));
        }
        [HttpPut]
        public async Task<ActionResult> UpdateStatus(int id, int status)
        {
            return Ok(await _service.UpdateStatus(id, status));
        }
        //[HttpPut]
        //public async Task<ActionResult> Disable(int id)
        //{
        //    return Ok(await _service.Disable(id));
        //}
        [HttpDelete]
        public async Task<ActionResult> DeleteAsync(int id)
        {
            return Ok(await _service.DeleteAsync(id));
        }
    }
}
