var sys = require('sys') 
var exec = require('child_process').exec; 
var http = require('http'); 

 	var infoTXT   = '{"wiadomosc":""}';

	http.createServer( function(req,res) {

		function puts(error, stdout, stderr) {
			var wiadomosc = stdout;
			var infoObj   = {};
			if (wiadomosc) 	infoObj.wiadomosc = wiadomosc;
			infoTXT = JSON.stringify(infoObj);
		}

		var cTime = new Date();
  
			var query = require('url').parse(req.url,true).query;

			if (query) {
				var radio = query.radio;
				if (radio[0]=='v') {
					var v = (radio.split('v'))[1];
					v = parseInt(v);
					//console.log('v=',v);
					exec("mpc volume "+v, null);
					return;
				}
				//console.log('radio=',radio);
				if (radio =='a'){exec("mpc volume -8", null);}
				if (radio =='z'){exec("mpc volume +8", null);}
				if (radio =='q'){exec("mpc stop", null); return;}
				if (radio =='b'){exec("mpc volume 25", null);}
				if (radio =='c'){exec("mpc volume 50", null);}
				if (radio =='d'){exec("mpc volume 75", null);}
				if (radio =='e'){exec("mpc volume 90", null);}
				if (radio =='f'){exec("mpc volume 10", null);}

				if (radio !=undefined) {
					if (radio =='-1') exec("mpc stop", null);
					else if (radio =='999') exec("mpc stop", null);
					else exec("mpc play "+radio, null);	
				}
				if (query.info == 'radio'){
					exec("mpc current", puts);	
				}
				if (query.volume){
					exec("mpc volume "+query.volume, puts);	
				}

				if(query.bash){
					//console.log(query.bash);	
					exec('sudo '+query.bash, puts);	
				}


			}


   		//res.writeHead(200, {'Content-Type':'text/plain\nAccess-Control-Allow-Origin: *'});
		res.writeHead(200, {
			'Content-Type': 'text/plain',
			'Access-Control-Allow-Origin' : '*',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
		});   
			   //res.write('PI Radio gra !\n');
			   //res.write('Czas: '+cTime+'\n');
			   //if (radio) 		res.write('{"radio":"'+radio+'"}\n');
			   //if (wiadomosc) 	res.write('{"wiadomosc":"'+wiadomosc+'"}\n');
   res.write(infoTXT+'\n');
   res.end();
}).listen('8080');

console.log('Server running at http://127.0.0.1:8080/');





