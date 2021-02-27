using System;
using System.Collections.Generic;
using System.Text;
using IMBackEnd.Domain.Models;

namespace IMBackEnd.Domain.Interfaces
{
    public interface IInventoryRepository
    {
        bool AddToInventory(InventoryEntry inventoryEntry);

        bool RemoveFromInventory(int storeId, string sku);

        bool EditInventory(InventoryEntry inventoryEntry);

        IEnumerable<InventoryEntry> GetStoreInventory(int storeId);

        InventoryEntry GetProductByStore(int storeId, string sku);
    }
}
