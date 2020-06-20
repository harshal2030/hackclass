const express = require('express');
const cors = require('cors');
const path = require('path');

const userRouter = require('./routers/users');
const classRouter = require('./routers/class');
const topicRouter = require('./routers/topics');

const avatarPath = path.join(__dirname, '..');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(avatarPath));

app.use(userRouter);
app.use(classRouter);
app.use(topicRouter);

app.get('/', (req, res) => {
    res.send('testing hack jaipur');
});

const PORT = process.env.PORT || 3000;

app.listen(3000);
