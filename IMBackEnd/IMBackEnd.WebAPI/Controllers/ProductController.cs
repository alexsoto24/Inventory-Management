using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMBackEnd.DataAccess.Repositories;
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
            var dProducts = await Task.FromResult(_productRepository.GetProducts());
            if (dProducts.Any() && dProducts is IEnumerable<Domain.Models.Product> products)
            {
                return Ok(products);
            }
            return NotFound();
        }

        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Domain.Models.Product>> Get(int id)
        {
            var dProduct = await Task.FromResult(_productRepository.GetProductById(id));
            if (dProduct is Domain.Models.Product product)
            {
                return Ok(product);
            }

            return NotFound();
        }

        // POST api/<ProductController>
        [HttpPost]
        public async Task<IActionResult> Post(Domain.Models.Product product)
        {
            var created = await Task.FromResult(_productRepository.CreateProduct(product));
            if (created)
            {
                return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
            }
            return StatusCode(409);
        }

        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
