const express = require('express');
const Topic = require('./../models/topic');
const { auth } = require('./../middlewares/auth');
const Class = require('../models/class');
const { topicPath } = require('../utils/path')

const { nanoid } = require('nanoid')
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, topicPath)
    },
    filename: (req, file, cb) => {
        cb(null, nanoid()+file.originalname)
    }
})

const upload = multer({
    limits: {
        fieldSize: 50 * 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpeg|jpeg|mp4|pdf|doc|docx|xls|xlsx)$/)) {
            return cb(new Error('FIle not supported'))
        }

        cb(undefined, true);
    }
})

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

        const topicExists = await Topic.findOne({
            where: {
                className: req.body.className,
                title: req.body.title,
            },
            raw: true,
        })

        if (!topicExists) {
            throw new Error('Already created')
        }

        const topic = await Topic.create(req.body);

        res.send(topic);
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
})

router.post('/topics/attach', auth, async (req, res) => {
    try {
        const topicName = req.body.title;
        const topic = await Topic.findOne({
            where: {
                
            }
        })
    } catch (e) {
        console.log(e);
        res.sendStatus(400)
    }
})

module.exports = router;
