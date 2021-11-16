'use strict'

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(body.json());
app.use(cookie());

const users = {}
const ids = {}

app.post('/auth', function (req, res) {
    const username = req.body.username;
    const email = req.body.email;
    if (!username || !email)
        return res.status(400).end();
    if (!users[email]) {
        users[email] = {
            username,
            email,
            count: 0,
        };
    }
    const id = uuidv4();
    //const user = {username, email, score: 0};
    ids[id] = email;

    res.cookie('podvorot', id, {domain: 'autorisation.herokuapp.com', expires: new Date(Date.now() + 1000 * 60 * 10)});
    res.json({id});
});

app.get('/me', function (req, res) {
    const id = req.cookies['podvorot'];
    const email = ids[id];
    if (!email || !users[email])
        return res.status(401).end();

    users[email].count += 1;

    res.json(users[email]);
})


const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server listening port is ${port}`);
})








// const http = require("http");
// const fs = require('fs');
//
// const server = http.createServer(function (request, response) {
//     console.log(request.method, request.url);
//     if (request.url == '/style.css') {
//         const css = fs.readFileSync('public/style.css', 'utf8');
//         response.end(css);
//     } else {
//         const html = fs.readFileSync('public/index.html', 'utf8');
//         response.end(html);
//     }
// });
//
// server.listen(process.env.PORT || 3000);
// console.log('Server started');