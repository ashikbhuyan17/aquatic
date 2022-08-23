const express = require('express')
const path = require('path')
const cookieParser = require("cookie-parser");

// const userRouter = require('../../modules/user/user.routes')
const config = require('../index')
module.exports = function () {
    const app = express()
    app.use(express.json())
    app.use(cookieParser("cookie-secret"));
    const port = 5000
    app.set("port", port)

    // userRouter(app)
    const globalConfig = config.getGlobalConfig()
    globalConfig.routes.forEach((routePath) => {
        require(path.resolve(routePath))(app);
    });

    return app;
}
