'use strict'

const http = require("http");
const fs = require('fs')

const server = http.createServer((request, response) => {
    console.log(request.method, request.url);
    if (request.url == '/style.css') {
        const css = fs.readFileSync('style.css', 'utf8');
        response.end(css);
    } else {
        const html = fs.readFileSync('index.html', 'utf8');
        response.end(html);
    }
});

const PORT = process.env.PORT  || 3000;

server.listen(PORT);
console.log('Server started');