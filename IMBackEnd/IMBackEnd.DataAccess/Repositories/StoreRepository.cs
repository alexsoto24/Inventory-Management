using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using IMBackEnd.Domain.Interfaces;
using IMBackEnd.Domain.Models;

namespace IMBackEnd.DataAccess.Repositories
{
    public class StoreRepository : IStoreRepository
    {
        private readonly InventoryManagementContext _context;

        public StoreRepository(InventoryManagementContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public bool RegisterStore(IMBackEnd.Domain.Models.Store store)
        {
            var dbStore = _context.Stores.FirstOrDefault(s => s.Email == store.Email || s.Phone == store.Phone);
            if(dbStore != null)
            {
                return false;
            }
            dbStore = new Store
            {
                Id = store.Id,
                Name = store.Name,
                Email = store.Email,
                Phone = store.Phone,
                Address = store.Address
            };

            _context.Stores.Add(dbStore);
            _context.SaveChanges();

            return true;
        }

        public bool DeleteStore(int storeId)
        {
            var dbStore = _context.Stores.FirstOrDefault(s => s.Id == storeId);
            if (dbStore == null)
            {
                return false;
            }

            _context.Stores.Remove(dbStore);
            _context.SaveChanges();

            return true;
        }

        public bool EditStoreInfo(IMBackEnd.Domain.Models.Store store)
        {
            var dbStore = _context.Stores.FirstOrDefault(s => s.Id == store.Id);

            if (dbStore == null)
            {
                return false;
            }

            //dbStore.Email = store.Email;
            dbStore.Phone = store.Phone;
            dbStore.Address = store.Address;

            _context.SaveChanges();

            return true;
        }

        public IEnumerable<IMBackEnd.Domain.Models.Store> GetStores(string name = null)
        {
            List<Store> dbStores = new List<Store>();

            if (!string.IsNullOrWhiteSpace(name))
            {
                dbStores = _context.Stores
                    .Include(s => s.InventoryEntries)
                    .Where(s => s.Name.Contains(name))
                    .ToList();
            }
            else
            {
                dbStores = _context.Stores
                    .Include(s => s.InventoryEntries)
                    .ToList();
            }

            List<Domain.Models.Store> stores = new List<Domain.Models.Store>();

            if (!dbStores.Any())
            {
                return stores;
            }

            stores = dbStores.Select(s => new Domain.Models.Store
            {
                Id = s.Id,
                Name = s.Name,
                Email = s.Email,
                Phone = s.Phone,
                Address = s.Address,
                Inventory = s.InventoryEntries.Select(i => new Domain.Models.InventoryEntry
                {
                    StoreId = i.StoreId,
                    SKU = i.Sku,
                    Name = i.Name,
                    Description = i.Description,
                    Price = i.Price,
                    Stock = i.Stock
                }).ToList()
            }).ToList();

            return stores;

        }

        public IMBackEnd.Domain.Models.Store GetStoreById(int id)
        {
            var dbStore = _context.Stores
                .Include(s => s.InventoryEntries)
                .FirstOrDefault(s => s.Id == id);
            
            if(dbStore == null)
            {
                return null;
            }

            Domain.Models.Store store = new Domain.Models.Store
            {
                Id = dbStore.Id,
                Name = dbStore.Name,
                Email = dbStore.Email,
                Phone = dbStore.Phone,
                Address = dbStore.Address,
                Inventory = dbStore.InventoryEntries.Select(i => new Domain.Models.InventoryEntry
                {
                    StoreId = i.StoreId,
                    SKU = i.Sku,
                    Name = i.Name,
                    Description = i.Description,
                    Price = i.Price,
                    Stock = i.Stock
                }).ToList()
            };

            return store;
        }

        public IMBackEnd.Domain.Models.Store GetStoreByEmail(string email)
        {
            var dbStore = _context.Stores
                .Include(s => s.InventoryEntries)
                .FirstOrDefault(s => s.Email == email);

            if (dbStore == null)
            {
                return null;
            }

            Domain.Models.Store store = new Domain.Models.Store
            {
                Id = dbStore.Id,
                Name = dbStore.Name,
                Email = dbStore.Email,
                Phone = dbStore.Phone,
                Address = dbStore.Address,
                Inventory = dbStore.InventoryEntries.Select(i => new Domain.Models.InventoryEntry
                {
                    StoreId = i.StoreId,
                    SKU = i.Sku,
                    Name = i.Name,
                    Description = i.Description,
                    Price = i.Price,
                    Stock = i.Stock
                }).ToList()
            };

            return store;
        }
    }
}
