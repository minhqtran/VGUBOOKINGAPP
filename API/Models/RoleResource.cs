using System;

namespace BookingApp.Models
{
    public class RoleResource
    {
        public int ID { get; set; }
        public string RoleName { get; set; }
        public string ResourceGuid { get; set; }
        public bool CanCreate { get; set; }
        public bool CanRead { get; set; }
        public bool CanUpdate { get; set; }
        public bool CanDelete { get; set; }
        public DateTime? CreateDate { get; set; }
        public int CreateBy { get; set; }
        public bool Status { get; set; }
        public string Guid { get; set; }
    }
}
