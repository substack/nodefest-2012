var secure = require('secure-peer');
var peer = secure(require('./b.json'));

var net = require('net');
var rawStream = net.connect(5000);

var sec = peer(function (stream) {
    stream.pipe(process.stdout);
    stream.end('beep boop\n');
});
sec.pipe(rawStream).pipe(sec);

// ./run1.sh
