const { getAllProducts } = require("./get.all.products.action");
const { getProductById } = require("./get.product.by.id.action")

module.exports = {
    '/': {
        get: {
            action: getAllProducts,
            level: 'public',
        }
    },
    '/:id': {
        get: {
            action: getProductById,
            level: 'public'
        }
    }
}