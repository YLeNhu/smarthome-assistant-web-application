// const Helper = require('./Helper');
const db = require('../config/db/DBconnection');
const bcrypt = require('bcrypt');
const { v1: uuidv1 } = require('uuid');

exports.showProfile = (req, res, next) => {
    if (req.session.user) {
        let sql1 = "select id, last_name, first_name, date_of_birth, phone_number, avatar, role from `account` where phone_number = ?";
        db.query(sql1, [req.session.user.phone_number], (err, acc) => {
            if (err) throw err;
            if (acc.length > 0) {
                let sql2 = "select * from account_address where account_id = ?";
                db.query(sql2, [acc[0].id], (err, acc_address) => {
                    if (err) throw err;
                    // res.json(acc[0]);
                    res.render('user/profile', { account: acc[0], address: acc_address });
                });
            }
            else {
                res.status(404).send("Can not found this account");
            }
        });
    }
    else {
        res.render('user/profile');
        // res.redirect('/profile');
    }
}

exports.updateAvatar = async (req, res, next) => {
    if (req.files) {
        let sampleFile = req.files.avatar;
        let uploadPath = './src/public/upload/avatar_user/' + sampleFile.name;
        sampleFile.mv(uploadPath, (err) => {
            if (err) return res.status(500).send(err);
            let sql = 'update account SET avatar = ? where phone_number = ?';
            db.query(sql, [sampleFile.name, req.session.user.phone_number], (err, result) => {
                if (err) throw err;
                if (result) {
                    req.session.user.avatar = sampleFile.name;
                    res.redirect('/profile');
                }
            })
        });
    }
    else {
        res.redirect('/profile');
    }
}
exports.updateProfile = async (req, res, next) => {
    if (req.body) {
        const profile = {
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            birthDay: req.body.birthDay,
            address: null
        }
        if (req.body.street && req.body.ward && req.body.district) {
            profile.address = `${req.body.street}, ${req.body.ward}, ${req.body.district}, Thành phố Hồ Chí Minh`;
        }

        let sql1 = "select id from account where phone_number = ?";
        db.query(sql1, [req.session.user.phone_number], (err, _id) => {
            if (err) throw err;
            const id = _id[0].id;
            let sql2 = "update account set last_name = ?, first_name = ?, date_of_birth = ? where id = ?";
            db.query(sql2, [profile.lastName, profile.firstName, profile.birthDay, id], (err, result) => {
                if (err) throw err;
                
            });
        });
    }
}

exports.deleteAddress = (req, res, next) => {
    const address = req.body.address;
    if(req.session.user) {
        let sql1 = "select id from account where phone_number = ?";
        db.query(sql1, [req.session.user.phone_number], (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                const id = result[0].id;
                let sql2 = "delete from account_address where account_id = ? and address = ?";
                db.query(sql2, [id, address], (err, deleteDone) => {
                    if (err) throw err;
                    res.json({ status: 200 });
                })
            }
        });
    }
    else {
        res.json({ status: 304 });
    }
}
function authLogin(req, res, next, input, result) {
    if (bcrypt.compareSync(input.password, result.password)) {
        req.session.user = result;
        if (result.role == 'A') {
            res.redirect('/admin');
        }
        else {
            res.redirect('/');
        }
    }
    else {
        res.render('login', { message: "Password is wrong" });
    }
}
exports.login = (req, res, next) => {
    const userInput = {
        phoneNumber: req.body.phoneNumber,
        password: req.body.password
    }
    let sql = 'SELECT * FROM account WHERE phone_number = ?';
    //console.log(0);
    db.query(sql, userInput.phoneNumber, (err, result) => {
        //console.log(1);
        if (err) throw err;
        if (result.length > 0) {
            //console.log(2);
            // Find if this user is a normal user 
            let sql2 = "select * from user where account_id = ?";
            db.query(sql2, [result[0].id], (err, vol) => {
                if (err) throw err;
                // Found
                if (vol.length > 0) {
                    authLogin(req, res, next, userInput, result[0]);
                }
                else {
                    //console.log(7);
                    authLogin(req, res, next, userInput, result[0]);
                }
            });
        }
        else {
            res.send('Account wasn\'t existed');
        }
    });

}
exports.register = (req, res, next) => {
    const userInput = {
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        image: 'avatar-default.jpg'
    }

    // Find if at least one user stored in database
    let sql = 'SELECT * FROM account WHERE phone_number = ?';
    db.query(sql, userInput.phoneNumber, (err, result) => {
        if (err) throw err;
        // One or more user are found
        if (result.length > 0) {
            res.render('register', { message: "Số điện thoại này đã được sử dụng" });
        }

        if (userInput.password !== userInput.confirmPassword) {
            res.render('register', { message: "Mật khẩu không khớp" });
        }

        else {
            const id = uuidv1();
            const today = new Date();
            let createTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

            let pwd = userInput.password;
            userInput.password = bcrypt.hashSync(pwd, 10);
            let sql = 'INSERT INTO account (id, last_name, first_name, phone_number, password, create_time, avatar, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            db.query(sql, [id, userInput.lastName, userInput.firstName, userInput.phoneNumber, userInput.password, createTime, userInput.image, 'C'], (err, result) => {
                if (err) throw err;
                if (result) {
                    sql = "INSERT INTO user SET account_id = ?;"
                    db.query(sql, [id], (err, result) => {
                        if (err) throw err;
                        if (result) {
                            res.render('login', { message: "Đăng ký tài khoản thành công" });
                        }
                    });

                }

            });
        }

    });
}

exports.userRegistier = (req, res, next) => {
    const userInput = {
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        image: 'avatar-default.jpg'
    }

    // Find if at least one user stored in database
    let sql = 'SELECT * FROM `account`, user WHERE phone_number = ?;';
    db.query(sql, userInput.phoneNumber, (err, result) => {
        if (err) throw err;
        // One or more user are found
        if (result.length > 0) {
            res.render('normal_user/register', { message: "Số điện thoại này đã được sử dụng" });
        }

        sql = "select * from `account`, user where `account`.id = user.account_id and user.email = ?";
        db.query(sql, [userInput.email], (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                res.render('normal_user/register', { message: "Email này đã được sử dụng" });
            }
        })

        if (userInput.password !== userInput.confirmPassword) {
            res.render('normal_user/register', { message: "Mật khẩu không khớp" });
        }

        else {
            const id = uuidv1();
            const today = new Date();
            let createTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

            let pwd = userInput.password;
            userInput.password = bcrypt.hashSync(pwd, 10);
            let sql = 'INSERT INTO account (id, last_name, first_name, phone_number, password, create_time, avatar, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?);';
            db.query(sql, [id, userInput.lastName, userInput.firstName, userInput.phoneNumber, userInput.password, createTime, userInput.image, 'V'], (err, result) => {
                if (err) throw err;
                if (result) {
                    sql = "INSERT INTO user SET email = ?, account_id = ?;"
                    db.query(sql, [userInput.email, id], (err, result) => {
                        if (err) throw err;
                        if (result) {
                            res.render('login', { message: "Đăng ký tài khoản thành công. Quản trị viên sẽ liên lạc với bạn~" });
                        }
                    });

                }

            });
        }

    });
}
exports.loggout = (req, res, next) => {
    // res.json("Loggout");
    if (req.session.user) {
        req.session.destroy(() => {
            req.session = null;
            res.redirect('/');
        });
    }
}