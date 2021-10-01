class testTCPClient {
  constructor(tcpPort, tcpHost) {
    this.tcpHost = tcpHost;
    this.tcpPort = tcpPort;
    this.conn = net.createConnection(this.tcpPort, this.tcpHost);
  }


  getConn() {
    return this.conn;
  }

  writeToServer() {

  }
  function createTCPConnection(){
    var conn = net.createConnection(tcpPort ,tcpHost);
    return conn;
  }
  function destroyConnection(conn){
    conn.destroy();
    console.log("Destroyed");
  }
}
