const { getAllProducts } = require("./get.all.products.action");
const { getProductById } = require("./get.product.by.id.action")
const { editProduct } = require("./edit.product.action")

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
        },
        post: {
            action: editProduct,
            level: 'member'
        }
    }
}