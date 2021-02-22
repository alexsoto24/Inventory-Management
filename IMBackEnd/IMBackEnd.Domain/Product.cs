using System;
using System.Collections.Generic;
using System.Text;

namespace IMBackEnd.Domain
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Amount { get; set; }

        public decimal Price { get; set; }
    }
}
