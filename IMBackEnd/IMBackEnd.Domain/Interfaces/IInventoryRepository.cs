using System;
using System.Collections.Generic;
using System.Text;
using IMBackEnd.Domain.Models;

namespace IMBackEnd.Domain.Interfaces
{
    public interface IInventoryRepository
    {
        bool AddToInventory(int storeId, Product product);

        bool RemoveFromInventory(int storeId, int productId);

        bool EditInventory(int storeId, Product product);
    }
}
