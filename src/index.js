const express = require('express');
const cors = require('cors');
const path = require('path');

const userRouter = require('./routers/users');
const classRouter = require('./routers/class');
const topicRouter = require('./routers/topics');

const publicPath = path.join(__dirname, '../public');

const indexFile = path.join(__dirname, '../public/index.html');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(publicPath));

app.use(userRouter);
app.use(classRouter);
app.use(topicRouter);

app.get('/', (req, res) => {
    res.sendFile(indexFile);
});

app.get('/home', (req, res) => {
    res.sendFile(`${publicPath}/pages/dashboard.html`);
})

app.get('/joinclass', (req, res) => {
    res.sendFile(`${publicPath}/pages/class.html`);
})

const PORT = process.env.PORT || 3000;

app.listen(3000);
