using BookingApp.Data;
using BookingApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace BookingApp.Helpers
{
    public class LoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<LoggingMiddleware> _logger;
        private readonly IRepositoryBase<Log> _repoLog;
        public LoggingMiddleware(RequestDelegate next, 
            ILogger<LoggingMiddleware> logger
            //, IRepositoryBase<Log> repoLog
            )
        {
            _next = next;
            _logger = logger;
            //_repoLog = repoLog;
        }
        public async Task Invoke(HttpContext context, BookingAppContext bookingAppContext)
        {
            // Log before other middleware
            //_logger.LogInformation("API Request: {Method} {Path}", context.Request.Method, context.GetRouteData().Values["controller"]?.ToString());
            await _next(context);
            //bookingAppContext.Add(new Log
            //{
            //    UserGuid = context.User.Identity.Name,
            //    EventType = context.Request.Method,
            //    EventName = context.GetRouteData().Values["controller"]?.ToString(),
            //    Status = context.Response.StatusCode == 200
            //});
            bookingAppContext.Log.Add(new Log
            {
                TimeStamp = System.DateTime.Now,
                UserGuid = context.User.Identity.Name,
                EventType = context.GetRouteData().Values["action"]?.ToString(),
                EventName = context.GetRouteData().Values["controller"]?.ToString(),
                Status = context.Response.StatusCode.ToString()
            }) ;
            await bookingAppContext.SaveChangesAsync();
            // Log after other middleware (you might get response info here)
            //_logger.LogInformation("API Response: {StatusCode}", context.Response.StatusCode);

            // Potentially add the log entry to dbContext.Logs 
            // and call dbContext.SaveChanges() if desired
        }
    }
}
