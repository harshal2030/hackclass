const express = require('express');
const { Op } = require('sequelize');
const User = require('../models/user');
const sequelize = require('./../db');
const router = express.Router();

router.post('/users/signup', async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = await user.generateAuthToken();
        const userData = user.removeSensetives();

        res.send({ user: userData, token });
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password);
        const token = await user.generateAuthToken();
        const userData = user.removeSensetives();

        res.send({ user: userData, token });
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

router.get('/users/:username', async (req, res) => {
    try {
        const username = req.params.username;

        const users = await User.findOne({
            where: {
                username,
            },
        });

        if (!users) {
            throw new Error();
        }

        const user = users.removeSensetives();

        const classes = await sequelize.query(`SELECT "className", owner FROM classes WHERE :username = ANY(members)`, {
            replacements: {username},
            raw: true,
        })

        res.send({ ...user, classes: classes[0] });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    } 
});

module.exports = router;
