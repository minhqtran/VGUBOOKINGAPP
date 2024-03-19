﻿using System.Net;
namespace BookingApp.DTO
{
    public class OperationResult
    {
        public HttpStatusCode StatusCode { set; get; }
        public string Message { set; get; }
        public bool Success { set; get; }
        public object Data { set; get; }
    }
}
