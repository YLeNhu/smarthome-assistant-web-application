const homeRouter = require('./home');
const loginRouter = require('./login');
const loggoutRouter = require('./loggout');
const registerRouter = require('./register');
const profileRouter = require('./profile');
const supportRouter = require('./support');
const device_statusRouter = require('./device_status');
const testerRouter = require('./tester')
//const orderRouter = require('./order');

function route(app) {


    app.use('/support', supportRouter);
    app.use('/device_status', device_statusRouter);

    app.use('/login', loginRouter);
    app.use('/loggout', loggoutRouter);
    app.use('/register', registerRouter);
    app.use('/profile', profileRouter);

    app.use('/', homeRouter);
    app.use('/tester', testerRouter)
}

module.exports = route;