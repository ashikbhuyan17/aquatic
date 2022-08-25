const { login, register, forgotPassword, resetPassword, getSignedInAdminProfile } = require("./admin.controller")

module.exports = function (app) {
    app.post('/admin/login', login)
    app.post('/admin/register', register)
    app.post('/admin/forgot-password', forgotPassword)
    app.post('/admin/reset-password', resetPassword)
    app.get("/admin/profile", getSignedInAdminProfile);


}