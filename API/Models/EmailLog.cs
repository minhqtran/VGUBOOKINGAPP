﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace BookingApp.Models
{
    public partial class EmailLog
    {
        public decimal Id { get; set; }
        public string Type { get; set; }
        public decimal? BookingId { get; set; }
        public decimal? SendId { get; set; }
        public string Result { get; set; }
        public string FromEmail { get; set; }
        public string FromName { get; set; }
        public string Subject { get; set; }
        public string Sendto { get; set; }
        public string Sendtocc { get; set; }
        public string Sendtobcc { get; set; }
        public DateTime? Senddate { get; set; }
        public string Status { get; set; }
        public DateTime? CreateDate { get; set; }
        public decimal? CreateBy { get; set; }
        public decimal? SendBy { get; set; }
        public DateTime? SendDate1 { get; set; }
    }
}