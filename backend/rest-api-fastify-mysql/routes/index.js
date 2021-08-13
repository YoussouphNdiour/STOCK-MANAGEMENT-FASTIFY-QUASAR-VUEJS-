let news = require('../controller/products');

async function routes (fastify, options) {
    fastify.get('/', function (request, reply) {
        reply.send({message: 'ping success', code: 200})
    })
    fastify.get('/products', news.getProductsList);
    fastify.get('/products/:color', news.getProductsSearch);
    fastify.get('/searchcatalogcolor/:catalogcolor',news.getProductsSearchCatalogColor);
    fastify.post('/product', news.postProduct);
    fastify.delete('/product', news.deleteProduct);
    fastify.put('/product', news.updateProduct);
}

module.exports = routes;