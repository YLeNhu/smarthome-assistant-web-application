// const axios = require('axios')
// const express = require('express')

// const router = express.Router();

// router.get('/', (req, res, next) => {
//     axios
//         .get('https://io.adafruit.com/api/v2/yle1012/feeds/bbc-pump/data')
//         .then(data => {
//             console.log(data.data)
//             var ret = data.data
//             res.render('tester', {ret})
//         })
//         .catch(error => {
//             console.error(error)
//         })
        
    
// });

// module.exports = router;
const db = require('../config/db/DBconnection');
const express = require('express');
const router = express.Router();
const testerController = require('../controllers/TesterController');
const auth = require('../controllers/AuthenticateUser');

router.get('/', auth(['C']), testerController.show);
router.post('/post_data', auth(['C']), testerController.post);
router.post('/postIR', auth(['C']), testerController.postIR);
router.get('/getLastData',auth(['C']), testerController.getLastData);
router.get('/getLastGasValue',auth(['C']), testerController.getLastGasValue);
router.get('/getLastIR',auth(['C']), testerController.getLastIR);

module.exports = router;