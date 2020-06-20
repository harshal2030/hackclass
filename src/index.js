const express = require('express');
const cors = require('cors');

const userRouter = require('./routers/users');
const classRouter = require('./routers/class');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(userRouter);
app.use(classRouter);

app.get('/', (req, res) => {
    res.send('testing hack jaipur');
});

const PORT = process.env.PORT || 3000;

app.listen(3000);
