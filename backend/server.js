const path = require('path')
const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');

const connectDB = require('./config/db');
connectDB();

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/company', require('./routes/companyRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

if(process.env.NODE_ENV==='production') {
    app.use(express.static(path.join(__dirname, '../client/build')))

    app.get('*', (req,res) =>
      res.sendFile(path.resolve(__dirname,'../', 'client', 'build', 'index.html')))

}
 
app.use(errorHandler);
app.listen(port, function () {
    return console.log('listen to port '.concat(port));
});
