var http = require('http');
var split = require('split');
var through = require('through');

var server = http.createServer(function (req, res) {
    if (req.method !== 'POST') res.end('serious business logic\n');
    
    req.pipe(split('\n')).pipe(through(function (line) {
        var n = (Math.pow(1.102, Number(line)) + 8.92) * 1.05;
        this.emit('data', n + '\n');
    })).pipe(res);
});

var seaport = require('seaport');
var ports = seaport.connect(7000);

server.listen(8000);
