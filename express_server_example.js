var express = require('express');
var app = express();
var nr=0;
app.get('/', function (req, res) {
	var czas = (new Date()).toLocaleString();
	var paramRadio = req.query.radio;
	var paramBash  = req.query.bash;
	var czas = (new Date()).toLocaleString();
	var arr ={};
	arr.wiadomosc="to ju Hello";
	arr.nr = nr;
	arr.czas = czas;
	if (paramRadio) arr.radio = paramRadio;
	if (paramBash)  arr.bash = paramBash;
	var json = JSON.stringify(arr);
	
	res.setHeader("Content-Type", "application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Cache-Control","no-cache");
	
	res.send(json);
	nr++;

});

var server = app.listen(1956, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

