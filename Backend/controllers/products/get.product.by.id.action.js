const models = require('../../models')
const Product = models.Product

module.exports.getProductById = async (req, res) => {
    const id = req.params.id
    console.log(id)
    Product.findByPk(id).then((product) => {
        return res.send(product);
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(500);
    })
}