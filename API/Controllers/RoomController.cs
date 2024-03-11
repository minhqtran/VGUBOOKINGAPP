using Microsoft.AspNetCore.Mvc;
using BookingApp.DTO;
using BookingApp.Helpers;
using BookingApp.Services;
using Syncfusion.JavaScript;
using System.Threading.Tasks;
using BookingApp.DTO.Filter;

namespace BookingApp.Controllers
{
    public class RoomController : ApiControllerBase
    {
        private readonly IRoomService _service;

        public RoomController(IRoomService service)
        {
            _service = service;
        }

        //[HttpGet]
        //public async Task<ActionResult> GetSitesByAccount()
        //{
        //    return Ok(await _service.GetSitesByAccount());
        //}

        [HttpGet]
        public async Task<ActionResult> GetAllAsync() 
        {
            return Ok(await _service.GetAllAsync());
        }
        [HttpGet]
        public async Task<ActionResult> SearchRoom([FromQuery] RoomFilter roomFilter)
        {
            return Ok(await _service.SearchRoom(roomFilter));
        }
        [HttpGet]
        public async Task<ActionResult> GetByIDAsync(int id)
        {
            return Ok(await _service.GetByIDAsync(id));
        }
        //[HttpGet]
        //public async Task<ActionResult> GetWithPaginationsAsync([FromBody] PaginationParams paramater)
        //{
        //    return Ok(await _service.GetWithPaginationsAsync(paramater));
        //}
        //[HttpGet]
        //public async Task<ActionResult> SearchAsync([FromBody] PaginationParams param, [FromQuery] object text)
        //{
        //    return Ok(await _service.SearchAsync(param, text));
        //}
        //[HttpGet]
        //public async Task<ActionResult> GetDataDropdownlist([FromBody] DataManager data)
        //{
        //    return Ok(await _service.GetDataDropdownlist(data));

        //}
        //[HttpGet]
        //public async Task<ActionResult> CheckRoom()
        //{
        //    return Ok(await _service.CheckRoom());
        //}
        //[HttpGet]
        //public async Task<ActionResult> GetAudit(object id)
        //{
        //    return Ok(await _service.GetAudit(id));
        //}
        //[HttpGet]
        //public async Task<ActionResult> LoadData([FromBody] DataManager data, string farmGuid)
        //{
        //    return Ok(await _service.LoadData(data, farmGuid));
        //}
        //[HttpPost]
        //public async Task<ActionResult> DeleteUploadFile([FromForm] int key)
        //{
        //    return Ok(await _service.DeleteUploadFile(key));
        //}
        [HttpPost]
        public async Task<ActionResult> AddAsync([FromBody] RoomDto model)
        {
            return StatusCodeResult(await _service.AddAsync(model));
        }
        [HttpPut]
        public async Task<ActionResult> UpdateAsync([FromBody] RoomDto model)
        {
            return StatusCodeResult(await _service.UpdateAsync(model));
        }
        [HttpDelete]
        public async Task<ActionResult> DeleteAsync(int id)
        {
            return StatusCodeResult(await _service.DeleteAsync(id));
        }
 

    }
}
