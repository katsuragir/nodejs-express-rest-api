var express = require('express');
var router = express.Router();
var http = require("https");
var request = require('request');

router.get('/province', function(req, res, next) {
  var options = {
    url: 'https://api.rajaongkir.com/basic/province',
    headers: {
      'key': 'katsuragir'
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      res.json(info);
    }
  }

 request(options, callback);
});

router.get('/', function(req, res, next) {
   res.json({text: "ok"});
});

router.get('/province/:id', function(req, res, next) {
  var  { id }  = req.params;
  var options = {
    url: 'https://api.rajaongkir.com/basic/province?id=' + id,
    headers: {
      'key': 'katsuragir'
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      res.json(info);
    }
  }

 request(options, callback);
});

router.get('/city/:id', function(req, res, next) {
  var  { id }  = req.params;
  var options = {
    url: 'https://api.rajaongkir.com/basic/city?province=' + id,
    headers: {
      'key': 'katsuragir'
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      res.json(info);
    }
  }

 request(options, callback);

 
});

router.get('/city', function(req, res, next) {
  var  { id }  = req.params;
  var options = {
    url: 'https://api.rajaongkir.com/basic/city',
    headers: {
      'key': 'katsuragir'
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      res.json(info);
    }
  }

 request(options, callback);

 
});

router.get('/dtlcity/:id', function(req, res, next) {
  var  { id }  = req.params;
  var options = {
    url: 'https://api.rajaongkir.com/basic/city?id=' + id,
    headers: {
      'key': 'katsuragir'
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      res.json(info);
    }
  }

 request(options, callback);
});

router.get('/dist/:id', function(req, res, next) {
  var  { id }  = req.params;
  var options = {
    url: 'http://api.shipping.esoftplay.com/subdistrict/' + id
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      res.json(info);
    }
  }

 request(options, callback);
});

router.post('/dist/dtl', function(req, res, next) {
  var data = {
    city: req.body.city,
    dist: req.body.dist
  };
  
  var options = {
    url: 'http://api.shipping.esoftplay.com/subdistrict/' + `${data.city}/${data.dist}`
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      
      res.json(info);
    }
  }

 request(options, callback);
});

module.exports = router;
