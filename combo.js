var http = require('http').createServer(handler); //require http server, and create server with function handler()
var httpRequest = require('http');
const axios = require('axios');
var fs = require('fs'); //require filesystem module
var url = require('url');
var path = require('path');
var io = require('socket.io','net')(http) //require socket.io module and pass the http object (server)

// var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO

/****** FURMANS ******************************************************/
var furman1Value = 0;  // Turn off the Furman by default
var furman2Value = 0;  // Turn off the Furman by default
// var furman3Value = 0;  // Turn off the Furman by default
// var furman4Value = 0;  // Turn off the Furman by default



/****** CONSTANTS******************************************************/

const WebPort = 8000;

/* if you want to run WebPort on a port lower than 1024 without running
 * node as root, you need to run following from a terminal on the pi
 * sudo apt update
 * sudo apt install libcap2-bin
 * sudo setcap cap_net_bind_service=+ep /usr/local/bin/node
 */


/*************** Web Browser Communication ****************************/

// Start http webserver
http.listen(WebPort, '10.0.10.225', function() {  // This gets call when the web server is first started.
	// LED26.writeSync(GPIO26value); //turn LED on or off
	// LED20.writeSync(GPIO20value); //turn LED on or off
	// LED21.writeSync(GPIO21value); //turn LED on or off
	// LED16.writeSync(GPIO16value); //turn LED on or off
	getFurmanStatus(1).then((response) => {
		if (response == 'true') { furman1Value = 1; }
		else { furman1Value = 0; }
		console.log('inside then: ' + response);
		// console.log(typeof response);
	}
	)
	.catch((e) =>
  console.log(e)
	);
	// getFurmanStatus(2).then((response) => {
	// 	if (response == 'true') { furman2Value = 1; }
	// 	else { furman2Value = 0; }
	// 	console.log('inside then: ' + response);
	// 	// console.log(typeof response);
	// }
	// )
	// .catch((e) =>
  // console.log(e)
	// );
	// getFurmanStatus(3).then((response) => {
	// 	if (response == 'true') { furman3Value = 1; }
	// 	else { furman3Value = 0; }
	// 	console.log('inside then: ' + response);
	// 	// console.log(typeof response);
	// }
	// )
	// .catch((e) =>
  // console.log(e)
	// );

	// console.log(furman1Value);

	console.log('Server running on Port '+ WebPort);
	// console.log('Furman1Value = '+ furman1Value);
	// console.log('Furman2Value = '+ furman2Value);
	// console.log('Furman3Value = '+ furman3Value);
	}
);





// function handler is called whenever a client makes an http request to the server
// such as requesting a web page.
function handler (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    console.log('filename='+filename);
    var extname = path.extname(filename);
    if (filename=='./') {
      console.log('retrieving default index.html file');
      filename= './index.html';
    }

    // Initial content type
    var contentType = 'text/html';

    // Check ext and set content type
    switch(extname) {
	case '.js':
	    contentType = 'text/javascript';
	    break;
	case '.css':
	    contentType = 'text/css';
	    break;
	case '.json':
	    contentType = 'application/json';
	    break;
	case '.png':
	    contentType = 'image/png';
	    break;
	case '.jpg':
	    contentType = 'image/jpg';
	    break;
	case '.ico':
	    contentType = 'image/png';
	    break;
    }



    fs.readFile(__dirname + '/public/' + filename, function(err, content) {
	if(err) {
	    console.log('File not found. Filename='+filename);
	    fs.readFile(__dirname + '/public/404.html', function(err, content) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		return res.end(content,'utf'); //display 404 on error
	    });
	}
	else {
	    // Success
	    res.writeHead(200, {'Content-Type': contentType});
	    return res.end(content,'utf8');
	}

    });
}


// Execute this when web server is terminated
process.on('SIGINT', function () { //on ctrl+c
  // LED26.writeSync(0); // Turn LED off
  // LED26.unexport(); // Unexport LED GPIO to free resources

  process.exit(); //exit completely
});


/****** io.socket is the websocket connection to the client's browser********/

io.sockets.on('connection', function (socket) {// WebSocket Connection
    console.log('A new client has connectioned. Send Furman status');
    socket.emit('Furman1', furman1Value);
    socket.emit('Furman2', furman2Value);
    // socket.emit('Furman3', furman3Value);
    // socket.emit('GPIO16', GPIO16value);

    // this gets called whenever client presses GPIO26 toggle light button
    socket.on('Furman1T', function(data) {
			if (furman1Value) {
				furman1Value = 0;
				//visit 10.0.10.221/furman1/off
				setFurmanStatus(1, 'off');
			}
			else {
				furman1Value = 1;
				//visit 10.0.10.221/furman1/off
				setFurmanStatus(1, 'on');
			}
			console.log('new furman1Value value='+furman1Value);
			//setFurmanStatus(deviceID)
			// LED26.writeSync(GPIO26value); //turn LED on or off
			console.log('Send new furman1Value state to ALL clients');
			io.emit('Furman1', furman1Value); //send button status to ALL clients
    });

  //   // this gets called whenever client presses GPIO20 toggle light button
    socket.on('Furman2T', function(data) {
			if (furman2Value) furman2Value = 0;
			else furman2Value = 1;
			console.log('new furman2Value value='+furman2Value);
			// LED20.writeSync(furman1Value); //turn LED on or off
			console.log('Send new furman2Value state to ALL clients');
			io.emit('Furman2', furman2Value); //send button status to ALL clients
    });
  //
    // // this gets called whenever client presses GPIO21 toggle light button
    // socket.on('Furman3T', function(data) {
		// 	if (furman3Value) furman3Value = 0;
		// 	else furman3Value = 1;
		// 	console.log('new furman3Value value='+furman3Value);
		// 	// LED21.writeSync(GPIO21value); //turn LED on or off
		// 	console.log('Send new furman3Value state to ALL clients');
		// 	io.emit('Furman3', furman3Value); //send button status to ALL clients
    // });



    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
	console.log('A user disconnected');
    });


});


async function getFurmanStatus(deviceID){

	var urlString = 'http://10.0.10.'
	var response = 'TEST';
	var status = '';

	try {
		if (deviceID == 1) {
			urlString += '221/furman1/status';
		} else if (deviceID == 2) {
			urlString += '223/furman2/status';
		// } else if (deviceID == 3) {
		// 	urlString += 'furman3/status';
		// } else if (deviceID == 4) {
		// 	urlString += 'furman4/status';
		}

		await (async () => {
		  try {
		    const response1 = await axios.all([
		      axios.get(urlString, {timeout: 5000}),
		    ]);
		    //console.log(response1);
				response = response1;
				// console.log(response.toString());

				response = JSON.stringify(response, getCircularReplacer());

				// console.log(response);
				//var result = response.indexOf('powerStatus');

				if (response.indexOf('"powerStatus":true') > 0) {
					console.log("It's ON");
					status = 'true';
				} else {
					console.log("It's OFF");
					status = 'false';
				}
				// return await response1.data();

		  } catch (error) {
		    console.log(error.response);
		  }
		})();

	} catch (err) {
		// Handle Error Here
		console.error(err);
	}
	// console.log(response);

	// console.log(response.values());
	// console.log(Object.entries(response));

	// console.log(response.data);
	return status;
}


async function setFurmanStatus(deviceID, action){
		var urlString = 'http://10.0.10.'
		console.log("inside set furman");

		try {
			if (deviceID == 1) {
				urlString += (action == 'on') ? "221/furman1/on" : "221/furman1/off";
				console.log("set urlString to : ", urlString);
			} else if (deviceID == 2) {
				urlString += (action == 'on') ? "223/furman2/on" : "223/furman2/off";
			// } else if (deviceID == 3) {
			// 	urlString += (action == 'on') ? "furman3/on" : "furman3/off";
			// } else if (deviceID == 4) {
			// 	urlString += (action == 'on') ? "furman4/on" : "furman4/off";
			}

			await (async () => {
				try {
					const response1 = await axios.all([
						axios.get(urlString, {timeout: 5000}),
					]);
					//console.log(response1);
					response = response1;
					// console.log(response.toString());
					console.log(response);

				} catch (error) {
					console.log(error.response);
				}
			})();

		} catch (err) {
			// Handle Error Here
			console.error(err);
		}
}

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};
