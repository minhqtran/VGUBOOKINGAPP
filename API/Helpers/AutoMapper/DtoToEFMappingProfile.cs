using AutoMapper;
using BookingApp.DTO;
using BookingApp.DTO.auth;
using BookingApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingApp.Helpers.AutoMapper
{
    public class DtoToEFMappingProfile : Profile
    {
        public DtoToEFMappingProfile()
        {
            CreateMap<BuildingDto, Building>();
        }
    }
}
