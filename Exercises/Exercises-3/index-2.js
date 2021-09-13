const express = require('express');
const app = express();
var fs = require('fs');

const date = new Date();

app.get(req, res, next) => {
var ip = req.headers['x-forwarded-for'] ||
req.socket.remoteAddress ||
null;
next();
};

fs.appendFile('logs.txt', 'hello', function(err) {
    if (err) throw err;
    console.log('Saved log file');
});

console.log(date.toUTCString());
console.log(ip);