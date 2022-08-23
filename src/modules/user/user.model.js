
const path = require('path')
const bcrypt = require('bcrypt');
const sequelize = require(path.join(process.cwd(), '/src/config/lib/sequelize.js'))
const { DataTypes } = require('sequelize');
const User = sequelize.define('users', {
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
    username: {
        type: DataTypes.TEXT,
        unique: true,
        len: [2, 6],
        trim: true,
        allowNull: false,

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
    role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: 'user'
    }
}, {
    // Other model options go here
    tableName: 'users',
    timestamps: true,
    createAt: 'create_at',
    updateAt: 'update_at',

    hooks: {
        beforeCreate: (user, options) => {
            {
                user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, 10) : "";
            }
        }
    }
});


User.prototype.comparePassword = function (password) {
    bcrypt.compare(password, this.password, function (res, err) {
        if (res) {
            console.log(res)
        } else {
            console.log(err)
        }
    })
    return bcrypt.compare(password, this.password)
}


module.exports = User