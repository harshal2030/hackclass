const { Op } = require('sequelize');
const User = require('./../models/user');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.jwt_secret);

        const user = await User.findOne({
            where: {
                username: decoded.username,
                tokens: {
                    [Op.contains]: [token],
                }
            }
        });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user.toJSON();
        next()
    } catch (e) {
        res.status(401).send({error: 'Please authenticate'})
    }
}

module.exports = { auth };
