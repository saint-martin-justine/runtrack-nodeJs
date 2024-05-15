const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = './index.html';

    if (req.url === '/') {
        filePath = './index.html';
    } else if (req.url === '/about') {
        filePath = './about.html';
    } else {
        filePath = './error.html';
    }

    fs.readFile(path.join(__dirname, filePath), (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('Page not found!');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        }
    });
});

const PORT = process.env.PORT || 8888;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
