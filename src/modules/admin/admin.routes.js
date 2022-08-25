const { login, register, forgotPassword, resetPassword, getSignedInAdminProfile,logout} = require("./admin.controller")

module.exports = function (app) {
    app.post('/api/admins/login', login)
    app.post('/api/admins/register', register)
    app.post('/api/admins/forgot-password', forgotPassword)
    app.post('/api/admins/reset-password', resetPassword)
    app.get('/api/admins/profile', getSignedInAdminProfile);
    app.post("/api/admins/logout", logout);
}