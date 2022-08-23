const path = require('path')
function init() {
    const sequelize = require(path.join(process.cwd(), '/src/config/lib/sequelize.js'))
    const user = require(path.join(process.cwd(), '/src/modules/user/user.model'))

    // sync = user table ke create kore dewa
    sequelize.sync()
        .then(() => {
            console.log("successful");
        })
        .catch((err) => {
            console.log(err);
        })
}
init()