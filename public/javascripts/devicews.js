
$(function () {
    // Position Variables
    var x = 0;
    var y = 0;
    var z = 0;

    // Acceleration
    var ax = 0;
    var ay = 0;

    var delay = 200;
    var Multiplier = 0.01;

    var content = $('#content');
    var status = $('#status');

    var connection = new WebSocket('ws://' + document.domain + ':3000');

    connection.onopen = function () {
        status.text('You are connected to bowwow PiTank Server.');
    };

    connection.onerror = function (error) {
        content.html(
                $('<p>', {text: 'connection or the server is down.'}));
    };


    if (window.DeviceMotionEvent != undefined) {

        window.ondevicemotion = function (event) {
            ax = Math.round((event.accelerationIncludingGravity.x * 1));
            ay = Math.round(Math.abs(event.accelerationIncludingGravity.y * 1));
        }

        setInterval(function () {
            connection.send('x' + ax);
          //connection.send('y' + ay);
        }, delay);
    }

});
