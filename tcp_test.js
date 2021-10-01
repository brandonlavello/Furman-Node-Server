var net = require('net');
var tcpPort = 12000;
var tcpHost = 'localhost';

var tcpConn = createTCPConnection();
monitorConnection(tcpConn);

tcpConn.write('Hello Server');
tcpConn.write('Hello Server');
tcpConn.write('Hello Server');
setTimeout(() => {  destroyConnection(tcpConn); }, 2000);

function createTCPConnection(){
  var conn = net.createConnection(tcpPort ,tcpHost);
  return conn;
}

async function monitorConnection(conn){
  conn.on('connect', function() {
        console.log('connected to server');
        conn.write('Hello Server');
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
           tcpConn = createTCPConnection();
           monitorConnection(tcpConn);
           setTimeout(() => {  tcpConn.write('Hello Server2'); }, 2000);
         });
  conn.on('end' , function(){
        console.log('Requested an end to the TCP connection');
         });
}

function destroyConnection(conn){
  conn.destroy();
  console.log("Destroyed");
}
