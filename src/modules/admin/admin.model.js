const path = require('path')
const sequelize = require(path.join(process.cwd(), '/src/config/lib/sequelize.js'))
const { DataTypes } = require('sequelize');
const Admin = sequelize.define('admins', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING
    },
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.firstName} ${this.lastName}`;
        },

    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        trim: true,
        allowNull: false,

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'admins',
    timestamps: true,
    createAt: 'create_at',
    updateAt: 'update_at',
    defaultScope: {
        attributes: { exclude: ['password', 'firstName', 'lastName', 'createdAt', 'updatedAt'] },
    }
});

module.exports = Admin