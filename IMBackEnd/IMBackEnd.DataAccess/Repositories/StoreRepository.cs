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
            var dbStore = _context.Stores.FirstOrDefault(s => s.Id == store.Id);
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
            throw new NotImplementedException();
        }

        public IEnumerable<IMBackEnd.Domain.Models.Store> GetStores(string name = null)
        {
            throw new NotImplementedException();
        }

        public IMBackEnd.Domain.Models.Store GetStoreById(int id)
        {
            throw new NotImplementedException();
        }

        public IMBackEnd.Domain.Models.Store GetStoreByEmail(string email)
        {
            throw new NotImplementedException();
        }
    }
}
