var seaport = require('seaport');
var ports = seaport.connect(7000);

var http = require('http');
var ecstatic = require('ecstatic')(__dirname + '/static');
var request = require('request');
var split = require('split');
var through = require('through');

var server = http.createServer(function (req, res) {
    if (req.method === 'POST') {
        ports.get('business@~0.5.1', function (recs) {
            var rec = recs[Math.floor(Math.random() * recs.length)];
            var u = 'http://' + rec.host + ':' + rec.port;
            var r = request.post(u);
            
            var sum = 0;
            function write (msg) { sum += Number(msg) }
            function end () {
                this.emit('data', sum + '\n');
                this.emit('end');
            }
            
            r.pipe(split('\n')).pipe(through(write, end)).pipe(res);
            r.end('111\n222\n333\n444\n555\n');
        });
    }
    else ecstatic(req, res);
});

server.listen(ports.register('web'));
