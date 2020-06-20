const express = require('express');
const Class = require('./../models/class');
const Request = require('./../models/request');
const sequelize = require('../db');
const { auth } = require('./../middlewares/auth');
const Topic = require('../models/topic');

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

        const isOwner = await Class.findOne({
            where: {
                owner: req.user.username
            },
            raw: true,
        });

        if (isOwner) {
            throw new Error('owner cant join')
        }

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
        const rawResult = await sequelize.query(`SELECT classes."className", requests.username, users.name, users.avatar 
        FROM classes INNER JOIN requests USING ("className") 
        INNER JOIN users on requests.username = users.username 
        WHERE classes."owner" = :username`, {
            replacements: { username: req.user.username }
        });

        const result = rawResult[0];
        res.send(result);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/class/requests', auth, async (req, res) => {
    try {
        const className = req.body.className;
        const owner = req.user.username;
        const username = req.body.username;

        const isOwned = await Class.findOne({
            where: {
                owner,
                className,
            },
            raw: true,
        });

        const request = await Request.findOne({
            username,
            className,
        })

        if (!request) {
            throw new Error();
        }

        if (!isOwned) {
            throw new Error();
        }

        await Class.update({members: [req.body.username, ...isOwned.members]}, {
            where: {
                owner,
                className,
            },
        });

        await Request.destroy({
            where: {
                username,
                className,
            },
        });

        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    } 
})

router.get('/class/:className', async (req, res) => {
    const className = req.params.className;
    try {
        const requiredClass = await Class.findOne({
            where: {
                className,
            },
            raw: true,
        });

        const topics = await Topic.findAll({
            where: {
                className,
            },
            raw: true,
        });

        res.send({...requiredClass, topics});
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
})

module.exports = router;
