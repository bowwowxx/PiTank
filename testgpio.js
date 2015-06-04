var gpio = require('pi-gpio');


//writeLow(16);
writeHigh(16);
writeHigh(22);


function writeHigh(pin) {
    console.log(pin + " high");
    gpio.close(pin, function (err) {
        console.log('err=',err);
        gpio.open(pin, "output", function (err) {
            gpio.write(pin, 1, function () {
                //gpio.close(pin);
            });
        });
    });
}

function writeLow(pin) {
    console.log(pin + " low");
    gpio.open(pin, "output", function (err) {
        gpio.write(pin, 0, function () {
            gpio.close(pin);
        });
    });
}

function closePin(pin) {
    console.log('Turning pin off since we are done.');
    console.log(pin + " -");
    gpio.open(pin, "output", function (err) {
        gpio.write(pin, 0, function () {
            gpio.close(pin);
        });
    });
}