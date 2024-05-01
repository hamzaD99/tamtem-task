const { loginUserByPassword } = require("./login.user.by.password.action.js");

module.exports = {
    '/login': {
        post: {
            action: loginUserByPassword,
            level: 'public'
        }
    }
}