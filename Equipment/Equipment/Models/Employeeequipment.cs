using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Equipment.Models
{
    public class Employeeequipment
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EquipmentId { get; set; }
        [Required(ErrorMessage = "This field cannot be empty")]
        public string EquipmentName { get; set; }
        [Required(ErrorMessage = "This field cannot be empty")]
        [DataType(DataType.Currency)]
        public string EquipmentAmount { get; set; }
        [Required(ErrorMessage = "This field cannot be empty")]
        [DataType(DataType.Date)]
        public DateTime PurchaseDate { get; set; }
    }
}
