using Equipment.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Equipment.Models.Equipmentmanager
{
    public class EquipmentRepository:Iequipmentrepository<Employeeequipment>
    {
        readonly Equipmentcontext _equipmentContext;
        public EquipmentRepository(Equipmentcontext context)
        {
            _equipmentContext = context;
        }
        public IEnumerable<Employeeequipment> GetAll()
        {
            return _equipmentContext.Equipments.ToList();
        }
        public Employeeequipment Get(long id)
        {
            return _equipmentContext.Equipments
                  .FirstOrDefault(e => e.EquipmentId == id);
        }
        public void Add(Employeeequipment entity)
        {
            _equipmentContext.Equipments.Add(entity);
            _equipmentContext.SaveChanges();
        }
        public void Update(Employeeequipment employee, Employeeequipment entity)
        {
            
            employee.EquipmentName = entity.EquipmentName;
            employee.EquipmentAmount = entity.EquipmentAmount;
            employee.PurchaseDate = entity.PurchaseDate;
            _equipmentContext.SaveChanges();
        }
        public void Delete(Employeeequipment employee)
        {
            _equipmentContext.Equipments.Remove(employee);
            _equipmentContext.SaveChanges();
        }
    }
}
