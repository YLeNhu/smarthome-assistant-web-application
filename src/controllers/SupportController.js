const db = require('../config/db/DBconnection');

exports.show = (req, res, next) => {
    db.query('SELECT id FROM account WHERE phone_number = ?', [req.session.user.phone_number], (err, customer_id) => {

        if (err) throw err;
        else if (customer_id)
        {
            const cusId = customer_id[0].id;
            // console.log(customer_id[0].id);
            let sql_choose_address = 'SELECT address FROM account_address WHERE account_id = ?';
            db.query(sql_choose_address, [cusId], (err, rows) => {
                if (err) throw err; 
                else{
                    // console.log(rows);
                    res.render('user/support', {rows});
                }
            });
        }
    
    });
    return;
}
exports.create = (req, res, next)  => {

    db.query('SELECT id FROM account WHERE phone_number = ?', [req.session.user.phone_number], (err, customer_id) => {
        if (err) throw err;
        if (customer_id) {
            console.log(customer_id)
            var string=JSON.stringify(customer_id);
            var json =  JSON.parse(string);
            var info = json[0].id
            let sql_support = "INSERT INTO `feedbacks` (content, account_id)  VALUES (?, ?)";
            db.query(sql_support, [req.body.feedback, info], (err, result) => {
                if (err) throw err;
                    res.redirect('/support');  
            });
        }
    });
    
}
