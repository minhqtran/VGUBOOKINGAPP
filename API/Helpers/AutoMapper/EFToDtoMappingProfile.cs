using AutoMapper;
using BookingApp.Data;
//using BookingApp.Dto;
using BookingApp.DTO;
using BookingApp.DTO.auth;
using BookingApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingApp.Helpers.AutoMapper
{
    public class EFToDtoMappingProfile : Profile
    {
        public EFToDtoMappingProfile()
        {
            CreateMap<Building, BuildingDto>();
            CreateMap<Campus, CampusDto>();
            CreateMap<User, UserDto>();
            CreateMap<Room, RoomDto>();
            CreateMap<Booking, BookingDto>();
            CreateMap<Log, LogDto>();

        }
    }
}
