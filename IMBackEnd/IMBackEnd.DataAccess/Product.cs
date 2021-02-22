using System;
using System.Collections.Generic;

#nullable disable

namespace IMBackEnd.DataAccess
{
    public partial class Product
    {
        public Product()
        {
            Inventories = new HashSet<Inventory>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Inventory> Inventories { get; set; }
    }
}
