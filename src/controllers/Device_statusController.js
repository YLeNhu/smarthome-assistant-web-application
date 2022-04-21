const db = require('../config/db/DBconnection');
const express = require('express')
const axios = require('axios')

exports.show = (req, res, next) => {
    if (req.session.user) {
        let sql_1 = "select id from account where phone_number = ?";
        
        db.query(sql_1, [req.session.user.phone_number], (err, re) => {
            // if (err) throw err;
            const id = re[0].id;
            let sql2 = "SELECT * FROM `devices` JOIN `devices_detail` ON devices.id = devices_detail.device_id WHERE (customer_id = ? AND devices.is_public = '1');";
            db.query(sql2, [id], async (err, devices_list) => {
                
                if (devices_list.length > 0) {
                    var l = devices_list.length;
                    let ret_list = [];
                    for (let i = 0; i < l; i++){
                        // console.log(devices_list[i].id)
                        var info = devices_list[i].feed_info;
                        var latest_info = info.concat("?limit=1");
                        // console.log(latest_info)
                        await axios.get(latest_info)
                            .then(data =>  {
                            // handle success
                            // console.log(data.data)
                                ret_list = ret_list.concat(data.data)
                                if ( i == l -1){
                                
                                    // console.log(ret_list);
                                    res.render('./user/device_status', {devices_list, ret_list})
                                }
                            })
                            .catch(function (error) {
                            // handle error
                                console.log(error);
                            })
                        
                    }
                      
                }
                else {
                    res.render('./user/device_status', { devices_list: null});
                }
            }) 
        });
    }
}
exports.showLog = (req, res, next) => {
    if (req.session.user) {
        let sql_1 = "select id from account where phone_number = ?";
        
        db.query(sql_1, [req.session.user.phone_number], (err, re) => {
            // if (err) throw err;
            const id = req.params.id;
            // console.log('ID:' + req.params);
            
            let sql2 = "SELECT * FROM `devices` JOIN `devices_detail` ON devices.id = devices_detail.device_id WHERE (devices.id = ? AND devices.is_public = '1');";
            db.query(sql2, [id], async (err, devices_list) => {

                
                if (devices_list.length > 0) {
                    // console.log(devices_list)
                    var info = devices_list[0].feed_info;
                    var latest_info = info.concat("?limit=5"); //New
                    await axios.get(latest_info) //New
                            .then(data =>  {
                            // handle success
                            // console.log(data.data)
                                ret_list = data.data
                                res.render('./devices/device_log', {devices_list, ret_list})
                            })
                            .catch(function (error) {
                            // handle error
                                console.log(error);
                            })
                      
                }
                else {
                    res.render('./devices/device_log', { devices_list: null});
                }
            }) 
        });


        
    }
}
