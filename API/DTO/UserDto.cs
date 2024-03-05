﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

#nullable disable

namespace BookingApp.DTO
{
    public partial class UserDto
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Department { get; set; }
        public string Role { get; set; }
        public int StaffCode { get; set; }
        public string LdapName { get; set; }
        public DateTime? CreateDate { get; set; }

        public int CreateBy { get; set; }
        //public DateTime? UpdateDate { get; set; }
        //public decimal? UpdateBy { get; set; }
        //public DateTime? DeleteDate { get; set; }
        //public decimal? DeleteBy { get; set; }
        public bool LdapLogin { get; set; }
        public bool Status { get; set; }
        public string Guid { get; set; }
    }
}
