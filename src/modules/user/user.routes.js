const { getUser, createUser, updateUser, signIn, login } = require('./user.controller')
module.exports = function (app) {
    app.get('/users', getUser)
    app.post('/users', createUser)
    app.post('/login', login)

    app.put('/users/:email', updateUser)
}