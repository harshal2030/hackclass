const express = require('express');
const User = require('../models/user');

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
})

module.exports = router;
