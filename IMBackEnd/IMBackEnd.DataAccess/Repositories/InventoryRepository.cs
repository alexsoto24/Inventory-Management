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
        public bool AddToInventory(Domain.Models.InventoryEntry inventoryEntry)
        {
            var dbInventoryEntry = _context.InventoryEntries.FirstOrDefault(i => i.StoreId == inventoryEntry.StoreId && i.Sku == inventoryEntry.SKU);

            if(dbInventoryEntry != null)
            {
                return false;
            }

            dbInventoryEntry = new InventoryEntry
            {
                StoreId = inventoryEntry.StoreId,
                Sku = inventoryEntry.SKU,
                Name = inventoryEntry.Name,
                Description = inventoryEntry.Description,
                Price = inventoryEntry.Price,
                Stock = inventoryEntry.Stock
                
            };

            _context.InventoryEntries.Add(dbInventoryEntry);
            _context.SaveChanges();

            return true;
        }

        public bool RemoveFromInventory(int storeId, string sku)
        {
            var dbInventoryEntry = _context.InventoryEntries.FirstOrDefault(i => i.StoreId == storeId && i.Sku == sku);

            if (dbInventoryEntry == null)
            {
                return false;
            }

            _context.InventoryEntries.Remove(dbInventoryEntry);
            _context.SaveChanges();

            return true;
        }

        public bool EditInventory(Domain.Models.InventoryEntry inventoryEntry)
        {
            var dbInventoryEntry = _context.InventoryEntries.FirstOrDefault(i => i.StoreId == inventoryEntry.StoreId && i.Sku == inventoryEntry.SKU);

            if (dbInventoryEntry == null)
            {
                return false;
            }

            dbInventoryEntry.StoreId = inventoryEntry.StoreId;
            dbInventoryEntry.Sku = inventoryEntry.SKU;
            dbInventoryEntry.Name = inventoryEntry.Name;
            dbInventoryEntry.Description = inventoryEntry.Description;
            dbInventoryEntry.Price = inventoryEntry.Price;
            dbInventoryEntry.Stock = inventoryEntry.Stock;
            
            _context.SaveChanges();

            return true;
        }

        public IEnumerable<Domain.Models.InventoryEntry> GetStoreInventory(int storeId)
        {
            var dbInventory = _context.InventoryEntries
                .Where(i => i.StoreId == storeId);

            List<Domain.Models.InventoryEntry> inventoryEntries = new List<Domain.Models.InventoryEntry>();

            if (!dbInventory.Any())
            {
                return inventoryEntries;
            }

            inventoryEntries = dbInventory.Select(i => new Domain.Models.InventoryEntry
            {
                StoreId = i.StoreId,
                SKU = i.Sku,
                Name = i.Name,
                Description = i.Description,
                Price = i.Price,
                Stock = i.Stock
            }).ToList();

            return inventoryEntries;
        }

        public Domain.Models.InventoryEntry GetProductByStore(int storeId, string sku)
        {
            var dbInventoryEntry = _context.InventoryEntries
                .FirstOrDefault(i => i.StoreId == storeId && i.Sku == sku);

            if (dbInventoryEntry == null)
            {
                return null;
            }

            Domain.Models.InventoryEntry inventoryEntry = new Domain.Models.InventoryEntry
            {
                StoreId = dbInventoryEntry.StoreId,
                SKU = dbInventoryEntry.Sku,
                Name = dbInventoryEntry.Name,
                Description = dbInventoryEntry.Description,
                Price = dbInventoryEntry.Price,
                Stock = dbInventoryEntry.Stock
            };

            return inventoryEntry;
        }
    }
}
