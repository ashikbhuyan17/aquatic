const path = require('path')
const sequelize = require(path.join(process.cwd(), '/src/config/lib/sequelize.js'))
const { DataTypes } = require('sequelize');
const Service = sequelize.define('services', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    service_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    tableName: 'services',
    timestamps: true,
    createAt: 'create_at',
    updateAt: 'update_at',
});

module.exports = Service