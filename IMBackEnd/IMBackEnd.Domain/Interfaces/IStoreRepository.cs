using System;
using System.Collections.Generic;
using System.Text;
using IMBackEnd.Domain.Models;

namespace IMBackEnd.Domain.Interfaces
{
    public interface IStoreRepository
    {
        bool RegisterStore(Store store);

        bool DeleteStore(int storeId);

        bool EditStoreInfo(Store store);

        IEnumerable<Store> GetStores(string name = null);
    }
}
