﻿using System;

namespace BookingApp.Models
{
    public partial class Room
    {
        public int ID { get; set; }
        public string BuildingGuid { get; set; }
        public string FloorGuid { get; set; }
        public string CampusGuid { get; set; }
        public int RoomNum { get; set; }
        public int RoomTypeID { get; set; }
        public DateTime? CreateDate { get; set; }
        public int CreateBy { get; set; }
        public bool Status { get; set; }
        public string RoomGuid { get; set; }
    }
}
