const models = require('../../models')
const Product = models.Product

module.exports.editProduct = async (req, res) => {
    const { id, name, description, price, image } = req.body
    console.log(image)
    Product.findByPk(id).then((product) => {
        if(name) product.name = name
        if(price) product.price = price
        if(description) product.description = description
        if(image) product.image = image
        product.save()
        return res.send(product);
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(500);
    })
}