const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('auth', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    // automatically table create hoiye jabe database e  
    sync: true
});
module.exports = sequelize