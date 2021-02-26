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
    public class StoreController : ControllerBase
    {
        private readonly IStoreRepository _storeRepository;

        public StoreController(IStoreRepository storeRepository)
        {
            _storeRepository = storeRepository;
        }

        // GET: api/<StoreController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Store>>> Get()
        {
            IEnumerable<Store> dStores;
            try
            {
                dStores = await Task.FromResult(_storeRepository.GetStores());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            if (dStores.Any())
            {
                return Ok(dStores);
            }

            return NotFound();
        }

        // GET api/<StoreController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Store>> Get(int id)
        {
            Store dStore;

            try
            {
                dStore = await Task.FromResult(_storeRepository.GetStoreById(id));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

            if(dStore != null)
            {
                return Ok(dStore);
            }

            return NotFound();
        }

        [HttpGet("email/{email}")]
        public async Task<ActionResult<Store>> Get(string email)
        {
            Store dStore;

            try
            {
                dStore = await Task.FromResult(_storeRepository.GetStoreByEmail(email));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            if (dStore != null)
            {
                return Ok(dStore);
            }

            return NotFound();
        }

        // POST api/<StoreController>
        [HttpPost]
        public async Task<IActionResult> Post(Store store)
        {
            bool created;

            try
            {
                created = await Task.FromResult(_storeRepository.RegisterStore(store));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

            if (created)
            {
                return CreatedAtAction(nameof(Post), new { id = store.Id }, store);
            }

            return StatusCode(409);
        }

        // PUT api/<StoreController>/5
        [HttpPut]
        public async Task<IActionResult> Put(Store store)
        {
            bool updated;

            try
            {
                updated = await Task.FromResult(_storeRepository.EditStoreInfo(store));
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

        // DELETE api/<StoreController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool deleted;

            try
            {
                deleted = await Task.FromResult(_storeRepository.DeleteStore(id));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

            if (deleted)
            {
                return Ok();
            }

            return NotFound();
        }
    }
}
