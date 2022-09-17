const { login, register, forgotPassword, resetPassword, getSignedInAdminProfile, logout } = require("./admin.controller")
const validate = require('../core/middlewares/validator.middleware')
const { registerSchema, loginSchema } = require('./admin.schema')
const AdminStrategy = require('./admin.authentication.middleware')
module.exports = function (app) {
    app.post('/api/admins/login', login)
    app.post('/api/admins/register', validate(registerSchema), register)
    app.post('/api/admins/forgot-password', forgotPassword)
    app.post('/api/admins/reset-password', resetPassword)
    app.get('/api/admins/profile',AdminStrategy, getSignedInAdminProfile);
    app.post("/api/admins/logout", logout);
}