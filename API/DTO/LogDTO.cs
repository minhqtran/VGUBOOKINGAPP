using System;

namespace BookingApp.DTO
{
    public class LogDTO
    {
        public int Id { get; set; }
        public DateTime? TimeStamp { get; set; }
        public string UserGuid { get; set; }
        public string EventTypeGuid { get; set; }
        public string Description { get; set; }
        public string AdditionalData { get; set; }
        public DateTime? CreateDate { get; set; }
        public int CreateBy { get; set; }
        public bool Status { get; set; }
        public string LogGuid { get; set; }
    }
}
