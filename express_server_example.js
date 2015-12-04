var loopnr=0;
var lastremoteIP='';
var express = require('express');
var app = express();

var util = require('util'),
    exec = require('child_process').exec,
    child;
var infor = '';
	
	function graj(r){
	//infor = '';
		child = exec('mpc play '+r,
		  function (error, stdout, stderr) {
			//console.log(stdout);
			infor = stdout;
			//console.log('stdout: ' + stdout);
			//console.log('stderr: ' + stderr);
			if (error !== null) {
			  console.log('exec error: ' + error);
			infor = error;
			}
		});

	}

	function glos(r){
		if (isNaN(r)) return;
		child = exec('mpc volume '+r,
		  function (error, stdout, stderr) {
			infor = stdout;
			if (error !== null) {console.log('exec error: ' + error); infor = error;}
		});
	}


var os = require( 'os' );
var networkInterfaces = os.networkInterfaces( );
//console.log( networkInterfaces );
var localIP = networkInterfaces.wlan1[0]['address'];
console.log('localIP=',localIP);




var nr=0;
app.get('/', function (req, res) {

	var remoteIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	if(remoteIP !=lastremoteIP){		
		console.log('remoteIP=',remoteIP);
		lastremoteIP = remoteIP;
	}
	console.log('req.query=',req.query);
	var czas = (new Date()).toLocaleString();
	var paramRadio = req.query.radio;
	var paramInfo  = req.query.info;
	var paramBash  = req.query.bash;
	var paramVol   = req.query.volume;
	var czas = (new Date()).toLocaleString();
	var arr ={};
	//arr.wiadomosc="";
	arr.nr = nr;
	arr.czas = czas;
	if (paramRadio){
		if(isNaN(paramRadio)){
			var vok = parseInt(paramRadio.slice(1));
			if(vok != 'NaN') glos(vok);
		}
		else if (paramRadio) {
			arr.radio = paramRadio;
			graj(paramRadio);
		}
		arr.wiadomosc = infor;
	} // if paramRadio

	if (paramBash)  arr.bash = paramBash;
	if (paramVol)   arr.vol = paramVol;
	var json = JSON.stringify(arr);
	
	res.setHeader("Content-Type", "application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Cache-Control","no-cache");
	
	res.send(json);
	nr++;
	console.log(json);
});

	var server = app.listen(8080, function () {
	var host = server.address().address;
	var port = server.address().port;
	//console.log(server.address());
	console.log('Express radiodom listening at http://%s, http://%s:%s', localIP, host, port);
});
