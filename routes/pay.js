var express = require('express');
var router = express.Router();
var http = require("https");
var request = require('request');
var qs = require("query-string");
var xml2js = require('xml2js');

function Primary(data) {
    this.data = data;
  }
  
  function check (data) {
    Primary.call(this, data);
    console.log(data);
    
    request.post({url: 'https://api.vapehan.com/api/api/order/orders/notifPay', form: {key : JSON.stringify(data)}, headers: {'Content-Type' : 'application/json', 'Content-Length': data.length}}, function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('Gagal', err);
      }
      console.log('Berhasil', body);
    });
    
  }

/* GET users listing. */
router.post('/', function(req, respone, next) {
    console.log('masuk');
    var myFunc = () => {
      var post = JSON.parse(req.body.data);
      // console.log(post);
      var dataPayment = {
        MALLID: post.MALLID,
        CHAINMERCHANT: post.CHAINMERCHANT,
        TRANSIDMERCHANT: post.TRANSIDMERCHANT,
        SESSIONID: post.SESSIONID,
        WORDS: post.WORDS,
        CURRENCY: post.CURRENCY,
        PURCHASECURRENCY: post.PURCHASECURRENCY,
      };
      console.log(dataPayment);
      var formData = qs.stringify(dataPayment);
      var contentLength = formData.length;
  
      request({
        headers: {
          'Content-Length': contentLength,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: 'https://pay.doku.com/Suite/CheckStatus',
        body: formData,
        method: 'POST'},
        function optionalCallback(err, httpResponse, body) {
        if (err) {
          return console.error('Gagal', err);
        }
        xml2js.parseString(body, function (err, result) {
          if (err) {
            return console.error('Gagal', err);
          }
          var hasil = JSON.stringify(result.PAYMENT_STATUS);
          var res = JSON.parse(hasil);
          // console.log(res);
          if (res !== "" || res !== null) {
            // var data = JSON.parse(res);
            // res.json(res);
            console.log(res);
            if (res.RESPONSECODE[0] === '0000') {
              clearInterval(timerId);
              check(res);
              console.log('DONE');
            } else {
              console.log('NOT CLEAR');
            }
          }
        });
        
      });
  
    };
  
    var timerId = setInterval(myFunc, 1000);
    // setTimeout(myFunc, 5 * 1000);
});

module.exports = router;
