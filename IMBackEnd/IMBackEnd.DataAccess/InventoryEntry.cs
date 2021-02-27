using System;
using System.Collections.Generic;

#nullable disable

namespace IMBackEnd.DataAccess
{
    public partial class InventoryEntry
    {
        public int StoreId { get; set; }
        public string Sku { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }

        public virtual Store Store { get; set; }
    }
}
