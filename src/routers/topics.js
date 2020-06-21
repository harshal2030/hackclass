const express = require('express');
const Topic = require('./../models/topic');
const { auth } = require('./../middlewares/auth');
const Class = require('../models/class');
const { topicPath } = require('../utils/path')
const fs = require('fs');

const { nanoid } = require('nanoid')
const multer = require('multer');

const router = express.Router();

const upload = multer({
    limits: {
        fieldSize: 50 * 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpeg|jpeg|mp4|pdf|doc|docx|xls|xlsx)$/)) {
            return cb(new Error('FIle not supported'))
        }

        cb(undefined, true);
    },
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

router.post('/topics/attach', auth, upload.single('attachement'), async (req, res) => {
    try {
        const title = req.body.title;
        const topic = await Topic.findOne({
            where: {
                title,
            },
            raw: true,
        });

        if (!topic) {
            throw new Error();
        }

        const topicClass = Class.findOne({
            where: {
                className: topic.className,
                owner: req.user.username,
            },
            raw: true,
        });

        if (!topicClass) {
            throw new Error();
        }

        const fileName = `${nanoid()}.${req.file.originalname}`;

        fs.writeFileSync(`${topicPath}/${fileName}`, req.file.buffer, { encoding:'ascii' });
        await Topic.update({ attachments: [fileName, ...topic.attachements] }, {
            where: {
                className: topic.className,
                title,
            }
        })
        res.sendStatus(200)
    } catch (e) {
        console.log(e);
        res.sendStatus(400)
    }
});

module.exports = router;
