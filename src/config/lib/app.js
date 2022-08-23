module.exports.start = function () {
    const app = require('./express')()
    const port = app.get("port")
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}