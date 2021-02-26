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
        public async Task<ActionResult<IEnumerable<Product>>> Get(int storeId)
        {
            IEnumerable<Product> dProducts;

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

        [HttpGet("store/{storeId}/product/{productId}")]
        public async Task<ActionResult<Product>> Get(int storeId, int productId)
        {
            Product dProduct;

            try
            {
                dProduct = await Task.FromResult(_inventoryRepository.GetProductByStore(storeId, productId));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            if (dProduct != null)
            {
                return Ok(dProduct);
            }

            return NotFound();

        }

        // POST api/<InventoryController>
        [HttpPost("{storeId}")]
        public async Task<IActionResult> Post(int storeId, Product product)
        {
            bool created;

            try
            {
                created = await Task.FromResult(_inventoryRepository.AddToInventory(storeId, product));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

            if (created)
            {
                return CreatedAtAction(nameof(Post), new { id = product.Id }, product);
            }

            return StatusCode(409);
        }

        // PUT api/<InventoryController>/5
        [HttpPut("store/{storeId}")]
        public async Task<IActionResult> Put(int storeId, Product product)
        {
            bool updated;

            try
            {
                updated = await Task.FromResult(_inventoryRepository.EditInventory(storeId, product));
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
        [HttpDelete("store/{storeId}/product/{productId}")]
        public async Task<IActionResult> Delete(int storeId, int productId)
        {
            bool deleted;

            try
            {
                deleted = await Task.FromResult(_inventoryRepository.RemoveFromInventory(storeId, productId));
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
