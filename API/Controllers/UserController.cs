﻿using Microsoft.AspNetCore.Mvc;
using BookingApp.DTO;
using BookingApp.Helpers;
using BookingApp.Services;
using Syncfusion.JavaScript;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using BookingApp.DTO.auth;

namespace BookingApp.Controllers
{
    public class UserController : ApiControllerBase
    {
        private readonly IUserService _service;

        public UserController(IUserService service)
        {
            _service = service;
        }
       
        [HttpGet]
        public async Task<ActionResult> GetAllAsync()
        {
            return Ok(await _service.GetAllAsync());
        }

        [HttpPost]
        public async Task<ActionResult> AddAsync([FromBody] UserDto model)
        {
            return StatusCodeResult(await _service.AddAsync(model));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateAsync([FromBody] UserDto model)
        {
            return StatusCodeResult(await _service.UpdateAsync(model));
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> LoginAsync([FromBody] UserForLoginDto model)
        {
            return StatusCodeResult(await _service.LoginAsync(model));
        }
        [HttpDelete]
        public async Task<ActionResult> DeleteAsync(int id)
        {
            return StatusCodeResult(await _service.DeleteAsync(id));
        }

        [HttpGet]
        public async Task<ActionResult> GetByIDAsync(int id)
        {
            return Ok(await _service.GetByIDAsync(id));
        }

        [HttpGet]
        public async Task<ActionResult> GetWithPaginationsAsync(PaginationParams paramater)
        {
            return Ok(await _service.GetWithPaginationsAsync(paramater));
        }
        

    }
}
