using System;

namespace BookingApp.Dto
{
    public class LogDto
    {
        public int Id { get; set; }
        public DateTime? TimeStamp { get; set; }
        public string UserGuid { get; set; }
        public int EventTypeID { get; set; }
        public int EventNameID { get; set; }
        public bool Status { get; set; }
    }
}
