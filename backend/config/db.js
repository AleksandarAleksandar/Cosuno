const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI);
        console.log(conn.connection.host);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};
module.exports = connectDb;
