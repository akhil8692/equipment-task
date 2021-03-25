using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Equipment.Models
{
    public class Equipmentcontext:DbContext
    {
        public Equipmentcontext(DbContextOptions options)
            : base(options)
        {
        }
        public DbSet<Employeeequipment> Equipments { get; set; }
    }
}
