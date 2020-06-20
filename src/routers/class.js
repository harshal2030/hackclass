const express = require('express');
const Class = require('./../models/class');
const { auth } = require('./../middlewares/auth');

const router = express.Router();

router.post('/class', auth, async (req, res) => {
    try {
        console.log(req.body);
        const createdClass = await Class.create({ owner: req.user.username, className: req.body.className });

        res.send(createdClass);
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
})

module.exports = router;
