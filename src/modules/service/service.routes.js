const { createService, getService } = require("./service.controller")

module.exports = function (app) {
    app
        .route("/api/service")
        .post(createService)
        .get(getService)

    // app.post("/api/service", createService)
    // app.get("/api/service", getService)

}