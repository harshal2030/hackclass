const express = require('express');

const userRouter = require('./routers/users');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);

app.get('/', (req, res) => {
    res.send('testing hack jaipur');
});

const PORT = process.env.PORT || 3000;

app.listen(3000);
