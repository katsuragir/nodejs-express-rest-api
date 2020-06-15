var express = require('express');
var router = express.Router();
var http = require("https");
var request = require('request');
var qs = require("query-string");

/* GET users listing. */
router.post('/', function(req, respone, next) {
  //console.log(req.body);
  var form = {
    origin: req.body.or,
    destination: req.body.des,
    weight: req.body.wei,
    courier: req.body.kur
  };
  //console.log(form);
  var formData = qs.stringify(form);
  var contentLength = formData.length;

  request({
    headers: {
      'key': 'katsuragir',
      'Content-Length': contentLength,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: 'https://api.rajaongkir.com/basic/cost',
    body: formData,
    method: 'POST'},
    function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('Gagal', err);
    }
    var data = JSON.parse(body);
    respone.json(data);
    // console.log(data.rajaongkir);
  });
});

module.exports = router;
