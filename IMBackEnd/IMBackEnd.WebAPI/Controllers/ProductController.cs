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
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }
        // GET: api/<ProductController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Domain.Models.Product>>> Get()
        {
            IEnumerable<Product> dProducts;

            try
            {
                dProducts = await Task.FromResult(_productRepository.GetProducts());
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

            if (dProducts.Any())
            {
                return Ok(dProducts);
            }
            return NotFound();
        }

        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> Get(int id)
        {
            Product dProduct;

            try
            {
                dProduct = await Task.FromResult(_productRepository.GetProductById(id));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            
            if (dProduct != null)
            {
                return Ok(dProduct);
            }

            return NotFound();
        }

        // POST api/<ProductController>
        [HttpPost]
        public async Task<IActionResult> Post(Domain.Models.Product product)
        {
            bool created;

            try
            {
                created = await Task.FromResult(_productRepository.CreateProduct(product));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            
            if (created)
            {
                return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
            }

            return StatusCode(409);
        }

        // PUT api/<ProductController>/5
        [HttpPut]
        public async Task<IActionResult> Put(Product product)
        {

            bool updated;
            try
            {
                updated = await Task.FromResult(_productRepository.EditProduct(product));
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

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool deleted;
            try
            {
                deleted = await Task.FromResult(_productRepository.DeleteProduct(id));
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
