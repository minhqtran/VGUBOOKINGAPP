using System;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata;
using NetUtility;
using BookingApp.Helpers;
using BookingApp.Models;

#nullable disable

namespace BookingApp.Data
{
    public partial class BookingAppContext : DbContext
    {
        private readonly IHttpContextAccessor _contextAccessor;

        public BookingAppContext(DbContextOptions<BookingAppContext> options, IHttpContextAccessor contextAccessor = null) : base(options)
        {
            _contextAccessor = contextAccessor;
        }
        public virtual DbSet<Building> Buildings { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Room> Rooms { get; set; }
        //public virtual DbSet<RefreshToken> RefreshTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.HasAnnotation("Relational:Collation", "English_United States.1252");

            modelBuilder.Entity<Building>(entity =>
            {
                entity.Property(e => e.BuildingGuid)
                   .HasColumnName("BuildingGuid")
                   .HasMaxLength(50);
                entity.ToTable("Building");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.LdapName)
                   .HasColumnName("LdapName")
                   .HasMaxLength(50);
                entity.ToTable("User");
            });
            modelBuilder.Entity<Room>(entity =>
            {
                entity.Property(e => e.RoomGuid)
                   .HasColumnName("RoomGuid")
                   .HasMaxLength(50);
                entity.ToTable("Room");
            });
            modelBuilder.Entity<Log>(entity =>
            {
                entity.Property(e => e.LogGuid)
                   .HasColumnName("LogGuid")
                   .HasMaxLength(50);
                entity.ToTable("Log");
            });
            modelBuilder.Entity<Booking>(entity =>
            {
                entity.Property(e => e.BookingGuid)
                   .HasColumnName("BookingGuid")
                   .HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            //Tự động cập nhật ngày giờ thêm mới và chỉnh sửa
            AutoAddDateTracking();
            return (await base.SaveChangesAsync(true, cancellationToken));
        }
#if DEBUG
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.LogTo(Console.WriteLine).EnableSensitiveDataLogging().EnableDetailedErrors();
#endif
        public void AutoAddDateTracking()
        {
            var modified = ChangeTracker.Entries().Where(e => e.State == EntityState.Modified || e.State == EntityState.Added);
            foreach (EntityEntry item in modified)
            {
                var changedOrAddedItem = item.Entity;
                if (changedOrAddedItem != null)
                {
                    if (item.State == EntityState.Added)
                    {
                        SetValueProperty(ref changedOrAddedItem, "CreateDate", "CreateBy");
                    }
                    if (item.State == EntityState.Modified)
                    {
                        SetValueProperty(ref changedOrAddedItem, "UpdateDate", "UpdateBy");
                        SetDeleteValueProperty(ref changedOrAddedItem);


                    }
                }
            }
        }
        public decimal? GetPropValue(object src, string propName)
        {
            return (decimal?)src.GetType().GetProperty(propName).GetValue(src, null);
        }
        public void SetDeleteValueProperty(ref object changedOrAddedItem)
        {
            string deleteDate = "DeleteDate";
            string status = "Status";
            string deleteBy = "DeleteBy";
            Type type = changedOrAddedItem.GetType();
            PropertyInfo propAdd = type.GetProperty(deleteDate);
            PropertyInfo propStatus = type.GetProperty(status);


            if (propStatus != null && propStatus.PropertyType.Name == "Decimal")
            {
                var statusValue = (decimal?)propStatus.GetValue(changedOrAddedItem, null);
                if (statusValue == 0)
                {
                    if (propAdd != null)
                    {
                        propAdd.SetValue(changedOrAddedItem, DateTime.Now, null);
                    }
                    var httpContext = _contextAccessor.HttpContext;
                    if (httpContext != null)
                    {
                        var accessToken = httpContext.Request.Headers["Authorization"];
                        var accountID = JWTExtensions.GetDecodeTokenByID(accessToken).ToDecimal();
                        PropertyInfo propCreateBy = type.GetProperty(deleteBy);
                        if (propCreateBy != null)
                        {
                            if (accountID > 0)
                            {
                                propCreateBy.SetValue(changedOrAddedItem, accountID, null);
                            }
                        }
                    }
                }

            }

        }
        public void SetValueProperty(ref object changedOrAddedItem, string propDate, string propUser)
        {
            Type type = changedOrAddedItem.GetType();
            PropertyInfo propAdd = type.GetProperty(propDate);
            if (propAdd != null)
            {
                propAdd.SetValue(changedOrAddedItem, DateTime.Now, null);
            }
            var httpContext = _contextAccessor.HttpContext;
            if (httpContext != null)
            {
                var accessToken = httpContext.Request.Headers["Authorization"];
                var accountID = JWTExtensions.GetDecodeTokenByID(accessToken).ToDecimal();
                PropertyInfo propCreateBy = type.GetProperty(propUser);
                if (propCreateBy != null)
                {
                    if (accountID > 0)
                    {
                        propCreateBy.SetValue(changedOrAddedItem, accountID, null);
                    }
                }
            }
        }
    }
}
