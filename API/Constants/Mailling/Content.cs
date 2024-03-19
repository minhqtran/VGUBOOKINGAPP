using System;

namespace BookingApp.Constants.Mailling
{
    public class Content
    {
        public const string Booking = "Your booking has been confirmed. Please check your booking details in the system.";
        public const string Update = "Your booking has been updated. Please check your booking details in the system.";
        public const string Cancel = "Your booking has been canceled. Please check your booking details in the system.";
        public const string Reminder = "This is a reminder for your booking. Please check your booking details in the system.";
        public static string Create()
        {
            return "Your booking has been created. Please check your booking details in the system.";
        }
        public static string Create(string GUID, DateTime startDate, DateTime endDate, string roomName, string siteName)
        {
            return "Your booking has been created. \n" +
                "Please check your booking details in the system. \n" +
                "Booking ID: " + GUID + 
                "\n Start Date: " + startDate + 
                "\n End Date: " + endDate + 
                "\n Room Name: " + roomName + 
                "\n Site Name: " + siteName;
        }   
    }
}
