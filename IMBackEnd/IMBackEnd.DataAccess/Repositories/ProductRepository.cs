using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using IMBackEnd.Domain.Interfaces;
using IMBackEnd.Domain.Models;

namespace IMBackEnd.DataAccess.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly InventoryManagementContext _context;

        public ProductRepository(InventoryManagementContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public bool CreateProduct(Domain.Models.Product product)
        {
            var dbProduct = _context.Products.FirstOrDefault(p => p.Name == product.Name);
            if(dbProduct != null)
            {
                return false;
            }
            dbProduct = new Product
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price,
                Description = product.Description
            };

            _context.Products.Add(dbProduct);
            _context.SaveChanges();

            return true;

        }

        public bool EditProduct(Domain.Models.Product product)
        {
            var dbProduct = _context.Products.FirstOrDefault(p => p.Id == product.Id);
            if(dbProduct == null)
            {
                return false;
            }

            dbProduct.Price = product.Price;
            dbProduct.Description = product.Description;

            _context.SaveChanges();

            return true;
        }

        public bool DeleteProduct(int id)
        {
            var dbProduct = _context.Products.FirstOrDefault(p => p.Id == id);
            if(dbProduct == null)
            {
                return false;
            }
            _context.Products.Remove(dbProduct);
            _context.SaveChanges();

            return true;
        }

        public IEnumerable<Domain.Models.Product> GetProducts()
        {
            List<Product> dbProducts = _context.Products.ToList();

            List<Domain.Models.Product> products = new List<Domain.Models.Product>();

            if (!dbProducts.Any())
            {
                return products;
            }

            products = dbProducts.Select(p => new Domain.Models.Product
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Description = p.Description
            }).ToList();

            return products;

        }

        public Domain.Models.Product GetProductById(int id)
        {
            var dbProduct = _context.Products.FirstOrDefault(p => p.Id == id);

            if(dbProduct == null)
            {
                return null;
            }

            Domain.Models.Product product = new Domain.Models.Product
            {
                Id = dbProduct.Id,
                Name = dbProduct.Name,
                Price = dbProduct.Price,
                Description = dbProduct.Description
            };

            return product;
        }
    }
}
