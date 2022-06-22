const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a company name'],
    },
    speciality: {
        type: String,
        enum: ['Excavation', 'Plumbing', 'Electrical', 'Sewage', 'Demolish'],
        required: [true, `Please add company's specialty`],
    },
    city: {
        type: String,
        required: [true, 'Please add a city'],
    },
});
module.exports = mongoose.model('Company', companySchema);
