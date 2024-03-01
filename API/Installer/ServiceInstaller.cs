using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using BookingApp.Helpers;
using BookingApp.Services;
using Quartz;
using System;
using BookingApp.Helpers.ScheduleQuartz;

namespace BookingApp.Installer
{
    public class ServiceInstaller : IInstaller
    {

        public void InstallServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IBuildingService, BuildingService>();
            services.AddScoped<ILdapService, LdapService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAuthService, AuthService>();

        }
    }
}
