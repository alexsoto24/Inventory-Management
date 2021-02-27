using System;
using System.Collections.Generic;
using System.Text;

namespace IMBackEnd.Domain.Models
{
    public class InventoryEntry
    {
        public int StoreId { get; set; }
        public string SKU { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
    }
}
