using System;
using System.Collections.Generic;
using System.Text;
using IMBackEnd.Domain.Models;

namespace IMBackEnd.Domain.Interfaces
{
    public interface IProductRepository
    {
        bool CreateProduct(Product product);

        bool EditProduct(Product product);

        bool DeleteProduct(int id);

        IEnumerable<Product> GetProducts();

        Product GetProductById(int id);
    }
}
