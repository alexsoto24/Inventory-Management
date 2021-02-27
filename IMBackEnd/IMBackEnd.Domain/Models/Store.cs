using System;
using System.Collections.Generic;
using System.Text;

namespace IMBackEnd.Domain.Models
{
    public class Store
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public List<InventoryEntry> Inventory { get; set; }
    }
}
