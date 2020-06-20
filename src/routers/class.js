const express = require('express');
const Class = require('./../models/class');
const Request = require('./../models/request');
const { auth } = require('./../middlewares/auth');

const router = express.Router();

router.post('/class', auth, async (req, res) => {
    try {
        console.log(req.body);
        const createdClass = await Class.create({ owner: req.user.username, ...req.body });

        res.send(createdClass);
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

router.post('/class/join', auth, async (req, res) => {
    try {
        const requestedClass = await Class.findOne({
            where: {
                className: req.body.className,
            },
            raw: true,
        })

        if (!requestedClass) {
            throw new Error();
        }

        const request = await Request.create({ username: req.user.username,  className: req.body.className});
        res.send(request);
    } catch (e) {
        res.sendStatus(400);
    }
});

router.get('/class/requests', auth, async (req, res) => {
    try {

    } catch (e) {
        
    }
})

module.exports = router;
