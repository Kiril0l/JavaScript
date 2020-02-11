'use strict'

var field = new Field();

field.init();
// var line = 0;
// var col = 0;
// var speed = 500;
// field.set_cell(line, col, false);
// var interval = setInterval(move, speed);

// function move () {
//     field.clean();
//     field.set_cell(line++, col++);
//     field.show();
//     field.set_cell(line-1, col-1, false);
//     if (FIELD_HEIGHT == line) {
//         line = 0;
//     }
//     if (FIELD_WIDTH == col) {
//         col = 0;
//     }
// }

// var speed_interval = setInterval(() => {
//     clearInterval(interval);
//     speed -= 200;
//     interval = setInterval(move, speed);
// }, 4000);

// setTimeout(() => {
//     clearInterval(speed_interval);
//     clearInterval(interval);
// }, 10000);