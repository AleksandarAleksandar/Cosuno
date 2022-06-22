const express = require('express');
const router = express.Router();
const {
    getCompany,
    postCompany,
    putCompany,
    deleteCompany,
} = require('../controllers/companyControler');

router.route('/').get(getCompany).post(postCompany);
router.route('/:id').put(putCompany).delete(deleteCompany);

module.exports = router;
