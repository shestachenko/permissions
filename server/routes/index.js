const express = require('express');
const router = express.Router();
const auth = require('./auth');
const http = require('http');
const https = require('https');
const querystring = require('querystring');

/* GET home page. */
router.get('/', function (req, res, next) {


    const data = JSON.stringify({
        'profile': {
            'firstName': 'Isaac 4.0',
            'lastName': 'Brock 4.0',
            'email': 'isaac.brock4@example.com',
            'login': 'isaac.brock4@example.com',
            'mobilePhone': '555-415-1337'
        }
    });
    console.log(data, '<-----here');

    const options = {
        host: 'dev-336354.okta.com',
        // port: 80,
        path: '/api/v1/users?activate=false',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'SSWS 00lxX5ahZb4fJxT4R7ioCxhasoMCGZG6qmoJuFluIL'
            // 'Content-Length': Buffer.byteLength(data)
        }
    };

    const httpreq = https.request(options, function (response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            console.log('body: ' + chunk);
        });
        response.on('end', function () {
            res.send('ok');
        });
        response.on('error', function () {
            res.send('error');
        })
    });
    httpreq.write(data);
    httpreq.end();


    // const httpreq = http.request(options, function(res)
    // {
    //   res.setEncoding('utf8');
    //   res.on('data', function (chunk) {
    //     console.log("body: " + chunk);
    //   });
    // });
    // req.write(data);
    // req.end();


    // res.render('index', { title: 'Express' });
});

module.exports = router;
