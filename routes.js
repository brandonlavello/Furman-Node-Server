const http = require("http");
const fs = require('fs').promises;
var net = require('net');


//TCP variables
var net = require('net');  //  Connect to TCP Server using the "net" module
var tcpPort = 8235;          // portNumber of serever which you connect
var tcpHost = '10.0.80.180';

const host = 'localhost';
const port = 8000;
const { parse } = require('querystring');

// var tcpDevices = new Map();
// tcpDevices.set(1,10.0.80.180);
// tcpDevices.get(1);

const books = JSON.stringify([
    { title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
    { title: "The Prophet", author: "Kahlil Gibran", year: 1923 }
]);


const requestListener = function (req, res) {
  if (req.method === 'GET') {
    console.log('GET Request');

    switch (req.url) {
      case "/books":
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(books);
        break

      case "/":
        console.log('Home page requested.');
        fs.readFile(__dirname + "/index.html")
                .then(contents => {
                    res.setHeader("Content-Type", "text/html");
                    res.writeHead(200);
                    res.end(contents);
                })
                .catch(err => {
                    res.writeHead(500);
                    res.end(err);
                    return;
                });
        break
      default:
        res.writeHead(404);
        res.end(JSON.stringify({error:"Resource not found"}));
    }
  } else if (req.method === 'POST') {
    console.log('POST Request');
    try {
      console.log('Handle Post');
      if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            console.log(
                parse(body)
            );
            res.end('ok');
            var tcpConn = createTCPConnection();
            monitorConnection(tcpConn);
            setTimeout(() => {  destroyConnection(tcpConn); }, 2000);
        });
      }
    } catch (e) {
      response.writeHead(500);
      response.end('Bad request.');
      return;
    }
    //console.log(new testTCPClient(1,2).connection());

  }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

function createTCPConnection(){
  var conn = net.createConnection(tcpPort ,tcpHost);
  return conn;
}

function writeTCPConnection(conn, data){
  conn.write(data);
  console.log(data + " written");
}

async function monitorConnection(conn){
  conn.on('connect', function() {
        console.log('connected to server');
        conn.write('!SEQ_OFF 0\n');
       });
  conn.on('data' , function (){
        console.log("Data received from the server: " , data);
          });
  conn.on('error', function(err) {
        console.log('Error in connection:', err);
        });
  conn.on('close', function() {
         console.log('connection got closed, will try to reconnect');
           conn.end();
         });
  conn.on('end' , function(){
        console.log('Requested an end to the TCP connection');
         });
}

function destroyConnection(conn){
  conn.destroy();
  console.log("Destroyed");
}
