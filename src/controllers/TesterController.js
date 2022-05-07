const db = require('../config/db/DBconnection');
const axios = require('axios')
const express = require('express')
const mqtt = require('mqtt')


exports.show = (req, res, next) => {
    if (req.session.user) {
        let sql = "select id from account where phone_number = ?";
        db.query(sql, [req.session.user.phone_number], (err, re) => {
            if (err) throw err;
            const id = re[0].id;
            // console.log(id)
            let sql2 = "SELECT * FROM `devices` where customer_id = ?;";
            db.query(sql2, [id], (err, devices_list) => {
                if (err) throw err;
                // console.log(devices_list)
                if (devices_list.length > 0) {
                    
                    res.render('tester', { devices_list });
                    if (err) throw err;
                        
                }
                else {
                    res.render('tester', { devices_list: null});
                }
            });
        });
    }
}
exports.getLastData = (req, res, next)=>{
    //================GET FEED INFO======================//
    const baseURL = "https://io.adafruit.com/api/v2/";
    const username = "doancnpm";
    const baseFeedName = "/feeds/";
    const feedName = "light";
    var info = baseURL + username + baseFeedName + feedName + "/data";
    //==================================================//
    //var info = 'https://io.adafruit.com/api/v2/doancnpm/feeds/light/data';
    var latest_info = info.concat("?limit=1");
    axios.get(latest_info) //New
        .then(data =>  {
            // console.log(data.data);
            res.json({msg:'success',data:data.data});   
        })
        .catch(function (error) {
                        // handle error
            console.log(error);
        })                    
}
exports.getLastGasValue =  (req, res, next) => {
    //================GET FEED INFO======================//
    const baseURL = "https://io.adafruit.com/api/v2/";
    const username = "doancnpm";
    const baseFeedName = "/feeds/";
    const feedName = "gas";
    var info = baseURL + username + baseFeedName + feedName + "/data";
    //==================================================//

    //var info = 'https://io.adafruit.com/api/v2/doancnpm/feeds/gas/data';
    var latest_info = info.concat("?limit=1");
    axios.get(latest_info) //New
        .then(data =>  {
            // console.log(data.data);
            res.json({msg:'success',data:data.data});   
        })
        .catch(function (error) {
                        // handle error
            console.log(error);
        })               
}

exports.getLastIR =  (req, res, next) => {
    //================GET FEED INFO======================//
    const baseURL = "https://io.adafruit.com/api/v2/";
    const username = "doancnpm";
    const baseFeedName = "/feeds/";
    const feedName = "mode";
    var info = baseURL + username + baseFeedName + feedName + "/data";
    //==================================================//
    //var info = 'https://io.adafruit.com/api/v2/doancnpm/feeds/mode/data';
    var latest_info = info.concat("?limit=1");
    axios.get(latest_info) //New
        .then(data =>  {
            // console.log(data.data);
            res.json({msg:'success',data:data.data});   
        })
        .catch(function (error) {
                        // handle error
            console.log(error);
        })               
}

exports.post = (req, res, next) => {
    console.log('Start lightbulb')
    const sendPostRequest = async () => {
        try {

            const client = mqtt.connect('mqtts://io.adafruit.com', {
                port: 8883,
                username: "doancnpm", //MODIFY HERE
                password: "aio_cfbT81VhiCX6KD0gf6jwU9L9a0W6" //MODIFY HERE
            });
            var light = `${client.options.username}/feeds/light`; //MODIFY HERE
            client.on('connect', function() {
                console.log(client.connected)
                client.subscribe(light, function(err){
                    console.log('Subscribed')
                    if(!err){
                        if(req.body.checkbox == 'LIGHT:ON'){
                            console.log('Publishing LIGHT:ON...')
                            client.publish(light, 'LIGHT:ON')
                        }
                        else{
                            console.log('Publishing LIGHT:OFF...')
                            client.publish(light, 'LIGHT:OFF')
                        }
                        
                    }
                })
            });
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    } 
    sendPostRequest();
    console.log('End')
}

exports.postIR = (req, res, next) => {
    console.log('Start_infrared')
    const sendPostRequest = async () => {
        try {

            const client = mqtt.connect('mqtts://io.adafruit.com', {
                port: 8883,
                username: "doancnpm", //MODIFY HERE
                password: "aio_cfbT81VhiCX6KD0gf6jwU9L9a0W6" //MODIFY HERE
            });
            var mode = `${client.options.username}/feeds/mode`; //MODIFY HERE
            client.on('connect', function() {
                console.log(client.connected)
                client.subscribe(mode, function(err){
                    console.log('Subscribed')
                    if(!err){
                        if(req.body.checkbox_mode == 'IR:ON'){
                            console.log('Publishing IR:ON...')
                            client.publish(mode, 'IR:ON')
                        }
                        else{
                            console.log('Publishing IR:OFF...')
                            client.publish(mode, 'IR:OFF')
                        }
                        
                    }
                })
            });
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    } 
    sendPostRequest();
    console.log('End')
}


