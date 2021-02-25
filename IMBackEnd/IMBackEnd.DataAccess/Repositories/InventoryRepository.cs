using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using IMBackEnd.Domain.Interfaces;
using IMBackEnd.Domain.Models;

namespace IMBackEnd.DataAccess.Repositories
{
    public class InventoryRepository : IInventoryRepository
    {
        private readonly InventoryManagementContext _context;

        public InventoryRepository(InventoryManagementContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public bool AddToInventory(int storeId, Domain.Models.Product product)
        {
            var dbInventory = _context.Inventories.FirstOrDefault(i => i.StoreId == storeId && i.ProductId == product.Id);

            if(dbInventory != null)
            {
                return false;
            }

            dbInventory = new Inventory
            {
                StoreId = storeId,
                ProductId = product.Id,
                Stock = product.Stock,
                Markup = product.Markup,
            };

            _context.Inventories.Add(dbInventory);
            _context.SaveChanges();

            return true;
        }

        public bool RemoveFromInventory(int storeId, int productId)
        {
            var dbInventory = _context.Inventories.FirstOrDefault(i => i.StoreId == storeId && i.ProductId == productId);

            if (dbInventory == null)
            {
                return false;
            }

            _context.Inventories.Remove(dbInventory);
            _context.SaveChanges();

            return true;
        }

        public bool EditInventory(int storeId, Domain.Models.Product product)
        {
            var dbInventory = _context.Inventories.FirstOrDefault(i => i.StoreId == storeId && i.ProductId == product.Id);

            if (dbInventory == null)
            {
                return false;
            }

            dbInventory.Stock = product.Stock;
            dbInventory.Markup = product.Markup;

            _context.SaveChanges();

            return true;
        }

        public IEnumerable<Domain.Models.Product> GetStoreInventory(int storeId)
        {
            var dbInventories = _context.Inventories
                .Include(i => i.Product)
                .Where(i => i.StoreId == storeId);

            List<Domain.Models.Product> products = new List<Domain.Models.Product>();

            if (!dbInventories.Any())
            {
                return products;
            }

            products = dbInventories.Select(i => new Domain.Models.Product
            {
                Id = i.Product.Id,
                Name = i.Product.Name,
                Price = i.Product.Price,
                Description = i.Product.Description,
                Markup = i.Markup,
                Stock = i.Stock
            }).ToList();

            return products;
        }

        public Domain.Models.Product GetProductByStore(int storeId, int productId)
        {
            var dbInventory = _context.Inventories.FirstOrDefault(i => i.StoreId == storeId && i.ProductId == productId);

            if(dbInventory == null)
            {
                return null;
            }

            Domain.Models.Product product = new Domain.Models.Product
            {
                Id = dbInventory.Product.Id,
                Name = dbInventory.Product.Name,
                Price = dbInventory.Product.Price,
                Description = dbInventory.Product.Description,
                Markup = dbInventory.Markup,
                Stock = dbInventory.Stock
            };

            return product;
        }
    }
}
