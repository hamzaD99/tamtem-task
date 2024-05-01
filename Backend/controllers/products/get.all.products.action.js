const models = require('../../models')
const Product = models.Product

module.exports.getAllProducts = async (req, res) => {
    Product.findAll({
        order: [['createdAt', 'ASC']]
    }).then((products) => {
        return res.send(products);
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(500);
    })
}