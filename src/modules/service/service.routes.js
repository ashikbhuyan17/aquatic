const { createService } = require("./service.controller")

module.exports = function (app) {
    app.post("/api/service", createService)
}