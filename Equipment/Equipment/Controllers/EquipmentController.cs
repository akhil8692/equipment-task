using Equipment.Models;
using Equipment.Models.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Equipment.Controllers
{
    [Route("api/equipment")]
    [ApiController]
    public class EquipmentController : ControllerBase
    {
        private readonly Iequipmentrepository<Employeeequipment> _dataRepository;
        public EquipmentController(Iequipmentrepository<Employeeequipment> dataRepository)
        {
            _dataRepository = dataRepository;
        }
        // GET: api/Employee
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Employeeequipment> employees = _dataRepository.GetAll();
            return Ok(employees);
        }
        // GET: api/Employee/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(long id)
        {
            Employeeequipment employee = _dataRepository.Get(id);
            if (employee == null)
            {
                return NotFound("The Employee record couldn't be found.");
            }
            return Ok(employee);
        }
        // POST: api/Employee
        [HttpPost]
        public IActionResult Post([FromBody] Employeeequipment employee)
        {
            if (employee == null)
            {
                return BadRequest("Employee is null.");
            }
            _dataRepository.Add(employee);
            return CreatedAtRoute(
                  "Get",
                  new { Id = employee.EquipmentId },
                  employee);
        }
        // PUT: api/Employee/5
        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] Employeeequipment employee)
        {
            if (employee == null)
            {
                return BadRequest("Employee is null.");
            }
            Employeeequipment employeeToUpdate = _dataRepository.Get(id);
            if (employeeToUpdate == null)
            {
                return NotFound("The Employee record couldn't be found.");
            }
            _dataRepository.Update(employeeToUpdate, employee);
            return NoContent();
        }
        // DELETE: api/Employee/5
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            Employeeequipment employee = _dataRepository.Get(id);
            if (employee == null)
            {
                return NotFound("The Employee record couldn't be found.");
            }
            _dataRepository.Delete(employee);
            return NoContent();
        }
    }
}
