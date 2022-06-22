const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');

const connectDB = require('./config/db');
connectDB();

const port = process.env.PORT;

const app = express();

console.log('hello app');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/company', require('./routes/companyRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);
app.listen(port, function () {
    return console.log('listen to port '.concat(port));
});
