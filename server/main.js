'use strict'

const http = require("http");
const fs = require('fs')

const server = http.createServer(function (request, response) {
    console.log(request.method, request.url);
    if (request.url == '/style.css') {
        const css = fs.readFileSync('public/style.css', 'utf8');
        response.end(css);
    } else {
        const html = fs.readFileSync('public/index.html', 'utf8');
        response.end(html);
    }
});

server.listen(process.env.PORT || 3000);
console.log('Server started');