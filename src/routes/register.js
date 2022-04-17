const express = require('express');
// const User = require('../models/user');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('register');
});

router.get('/normal_user', (req, res, next) => {
    res.render('normal_user/register');
});

router.post('/normal_user', UserController.userRegistier);
// Post register data
router.post('/',UserController.register);
module.exports = router;