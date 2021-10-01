// Load the http module to create an http server.
const http = require('http');

//define two constants, host and port that the server will be bound to
const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    res.writeHead(200);
    res.end("My first server!");
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
