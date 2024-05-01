const constents = require('../../common/constents');
const models = require('../../models')
const User = models.User
const UserSeries = models.UserSeries
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.loginUserByPassword = async (req, res) => {
    const { email, password } = req.body
    let userFound;
    let condtion = email ? { email: email } : null
    if (!condtion || !password) return res.status(400).send({ error: "Enter Email or Username and Password" })

    await User.findOne({
        where: condtion
    })
    .then((user) => {
        userFound = user
    }).catch((err) => {
        console.log(err)
        return res.status(500).send(err)
    })
    if (!userFound) return res.status(401).send({ error: "Wrong Credentials" })

    if (await bcrypt.compare(password, userFound.password)) {
        const token = jwt.sign({
            ...condtion,
            id: userFound.id
        }, constents.JWT_SECERT, { expiresIn: '24h' });
        return res.status(200).send({ "user": userFound, "token": token })
    }
    else {
        return res.status(401).send({ error: "Wrong Credentials" })
    }
}