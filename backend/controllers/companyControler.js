const asyncHandler = require('express-async-handler');

const Company = require('../models/companyModal');
const User = require('../models/userModel');
const getCompany = asyncHandler(async (req, res) => {
    const companies = await Company.find();
    res.status(200).json({ message: 'Get companies', companies });
});
const postCompany = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, city, speciality } = req.body;
    if (!name || !city || !speciality) {
        res.status(400);
        throw new Error('Please add all fields');
    }
    const companyExists = await Company.findOne({ name });

    if (companyExists) {
        res.status(400);
        throw new Error('Company already exists');
    }
    let company;

    try {
        company = await Company.create({
            name,
            city,
            speciality,
        });
    } catch (e) {
        res.status(400);
        throw new Error(e.message);
    }

    if (company) {
        res.status(201).json({
            _id: company.id,
            name: company.name,
            city: company.city,
            speciality: company.speciality,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
    res.status(200).json(company);
});
const putCompany = asyncHandler(async (req, res) => {
    // if (!req.params.id) {
    //     res.status(400);
    //     throw new Error('Please add company id');
    // }
    if (!req.body.name) {
        res.status(400);
        throw new Error('Please add company name');
    }
    if (!req.body.city) {
        res.status(400);
        throw new Error('Please add company city');
    }
    if (!req.body.speciality) {
        res.status(400);
        throw new Error('Please add company speciality');
    }
    const company = await Company.findById(req.params.id);

    if (!company) {
        res.status(400);
        throw new Error('No company with id ' + req.params.id);
    }
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedCompany);
});
const deleteCompany = asyncHandler(async (req, res) => {
    const company = await Company.findById(req.params.id);

    if (!company) {
        res.status(400);
        throw new Error('No company with id ' + req.params.id);
    }
    await company.remove();
    res.status(200).json({
        message: 'Company ' + company.name + ' with id ' + req.params.id + ' deleted',
    });
});
module.exports = {
    getCompany,
    postCompany,
    putCompany,
    deleteCompany,
};
