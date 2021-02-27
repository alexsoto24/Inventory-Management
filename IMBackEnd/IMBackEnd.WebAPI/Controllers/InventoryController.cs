using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMBackEnd.Domain.Interfaces;
using IMBackEnd.Domain.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IMBackEnd.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryRepository _inventoryRepository;

        public InventoryController(IInventoryRepository inventoryRepository)
        {
            _inventoryRepository = inventoryRepository;
        }

        // GET api/<InventoryController>/store/5
        [HttpGet("store/{storeId}")]
        public async Task<ActionResult<IEnumerable<InventoryEntry>>> Get(int storeId)
        {
            IEnumerable<InventoryEntry> dProducts;

            try
            {
                dProducts = await Task.FromResult(_inventoryRepository.GetStoreInventory(storeId));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            if (dProducts.Any())
            {
                return Ok(dProducts);
            }

            return NotFound();

        }

        [HttpGet("store/{storeId}/entry/{sku}")]
        public async Task<ActionResult<InventoryEntry>> Get(int storeId, string sku)
        {
            InventoryEntry dEntry;

            try
            {
                dEntry = await Task.FromResult(_inventoryRepository.GetProductByStore(storeId, sku));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            if (dEntry != null)
            {
                return Ok(dEntry);
            }

            return NotFound();

        }

        // POST api/<InventoryController>
        [HttpPost]
        public async Task<IActionResult> Post(InventoryEntry inventoryEntry)
        {
            bool created;

            try
            {
                created = await Task.FromResult(_inventoryRepository.AddToInventory(inventoryEntry));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

            if (created)
            {
                return CreatedAtAction(nameof(Post), new { StoreId = inventoryEntry.StoreId, Sku = inventoryEntry.SKU }, inventoryEntry);
            }

            return StatusCode(409);
        }

        // PUT api/<InventoryController>/5
        [HttpPut]
        public async Task<IActionResult> Put(InventoryEntry inventoryEntry)
        {
            bool updated;

            try
            {
                updated = await Task.FromResult(_inventoryRepository.EditInventory(inventoryEntry));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

            if (updated)
            {
                return Ok();
            }

            return NotFound();
        }

        // DELETE api/<InventoryController>/5
        [HttpDelete("store/{storeId}/entry/{sku}")]
        public async Task<IActionResult> Delete(int storeId, string sku)
        {
            bool deleted;

            try
            {
                deleted = await Task.FromResult(_inventoryRepository.RemoveFromInventory(storeId, sku));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

            if(deleted)
            {
                return Ok();
            }

            return NotFound();
        }
    }
}
