const express = require('express');
const Class = require('./../models/class');
const { auth } = require('./../middlewares/auth');
const Topic = require('../models/topic');
const { Op } = require('sequelize')
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
        const isClass = await Class.findOne({
            where: {
                className: req.body.className,
            },
            raw: true,
        });

        const canAdd = await Class.findOne({
            where: {
                className: req.body.className,
                members: {
                    [Op.contains]: [req.user.username],
                }
            }
        })

        if (isClass.owner === req.user.username) {
            throw new Error();
        }

        if (canAdd) {
            throw new Error();
        }

        if (!isClass) {
            throw new Error();
        }

        const joinedClass = await Class.update({members: [req.user.username, ...isClass.members]}, {
            where: {
                owner: isClass.owner, 
                className: req.body.className
            },
            returning: true,
        });
        res.send(joinedClass[1][0]);
    } catch (e) {
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
