﻿using System;
namespace BookingApp.DTO
{
    public partial class RoomDto
    {
        public int ID { get; set; }
        public string FloorGuid { get; set; }
        public int RoomNum { get; set; }
        public int RoomTypeID { get; set; }
        public string Description { get; set; }
        public int Capacity { get; set; }
        public string FacilityListGuid { get; set; }
        public DateTime? CreateDate { get; set; }
        public int CreateBy { get; set; }
        public bool Status { get; set; }
        public string RoomGuid { get; set; }
    }
}
