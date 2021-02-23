using System;
using System.Collections.Generic;

#nullable disable

namespace IMBackEnd.DataAccess
{
    public partial class Store
    {
        public Store()
        {
            Inventories = new HashSet<Inventory>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }

        public virtual ICollection<Inventory> Inventories { get; set; }
    }
}
