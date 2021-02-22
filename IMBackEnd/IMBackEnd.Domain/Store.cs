using System;
using System.Collections.Generic;
using System.Text;
using IMBackEnd.Domain;

namespace IMBackEnd.Domain
{
    public class Store
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }

        public IEnumerable<Product> Inventory { get; set;}
    }
}
