//Bowwow PiTank api control
//201505

var express = require('express')
        , routes = require('./routes')
        , user = require('./routes/user')
        , http = require('http')
        , path = require('path')
        , WebSocketServer = require('websocket').server
        , piblaster = require("pi-blaster.js");

var servo = require('piControl');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/turnRight', servo.turnRight);
app.get('/turnLeft', servo.turnLeft);
app.get('/turnUp', servo.turnUp);
app.get('/turnDown', servo.turnDown);
app.get('/turnStop', servo.turnStop);

var server = require('http').createServer(app);

server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

websock = new WebSocketServer({
        httpServer: server
});

websock.on('request', function (request) {
    
        console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

        var connection = request.accept(null, request.origin);
    
        console.log((new Date()) + ' Connection accepted.');


        connection.on('message', function (message) {  
        
                var data = message.utf8Data;
                data = data.slice(1, 3);
        
                // Set GPIO PWM of 7% 
                if (Number(data) > 2) {        
                        piblaster.setPwm(24, 0.17);
                }

                // Set GPIO PWM of 6%
                if (Number(data) < (-2)) {        
                        piblaster.setPwm(24, 0.1);
                }

                // Set GPIO PWM of 6~7%  
                if (Number(data) == 0) {        
                        piblaster.setPwm(24, 0.12);
                }

        });  
    
        connection.on('close', function (connection) {
                //close connection
                piblaster.setPwm(22, 0);
        });

        function closePin() {
                piblaster.setPwm(22, 0);
        }

});