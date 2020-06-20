const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const jwt = require('jsonwebtoken');
const { SHA256 } = require('crypto-js');

class User extends Model {
    async generateAuthToken() {
        const user = this;
        const token = jwt.sign({ username: user.username.toString() }, process.env.jwt_secret);
        user.tokens.push(token);
        await User.update({tokens: user.tokens}, { where: {
            username: user.username,
        } 
        });
        return token;
    }

    removeSensetives() {
        const user = this.toJSON();

        return {
            name: user.name,
            username: user.username,
            avatar: user.avatar,
        }
    }

    static async findByCredentials(username, password) {
        const user = await User.findOne({
            where: {
                username,
            }
        });

        if (!user) {
            throw new Error('No such user');
        }

        console.log(password, user.password)
        const pass = user.password;
        const epassword = SHA256(password).toString();

        if (pass !== epassword) {
            throw new Error('invlaid credentials')
        }

        return user;
    }
}

User.init({
    name: {
        type: DataTypes.STRING,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            min: 1,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatar: {
        type: DataTypes.STRING,
        defaultValue: '',
    },
    tokens: {
        type: DataTypes.ARRAY(DataTypes.STRING(300)),
        defaultValue: [],
    },
}, {
    sequelize,
    modelName: 'users',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeCreate: (user, options) => {
            user.password = SHA256(user.password).toString();
        }
    }
})

sequelize.sync();

module.exports = User;
