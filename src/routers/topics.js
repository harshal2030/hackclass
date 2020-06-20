const express = require('express');
const Topic = require('./../models/topic');
const CLass = require('../models/class');
const { auth } = require('./../middlewares/auth');
const Class = require('../models/class');

const router = express.Router();

router.post('/topic', auth, async (req, res) => {
    try {
        const owner = await Class.findOne({
            where: {
                owner: req.user.username,
                className: req.body.className,
            },
            raw: true
        })

        if (!owner) {
            throw new Error();
        }

        const topic = await Topic.create(req.body);

        res.send(topic);
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
})

module.exports = router;
