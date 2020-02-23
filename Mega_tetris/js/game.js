'use strict'

var field = new Field();
field.init();
var figure = new Figure(200);
figure.show()
var mask = new Mask(FIELD_WIDTH, FIELD_HEIGHT);
mask.set_figure(figure);
mask.merge();
apply(mask, field)
// field.show();

$("body").keypress((event) => {
    // console.log(event.code)
    // if(event.code == "KeyA") {
    //     console.log("LEFT");
    // }
    // if (event.code == "KeyD") {
    //     console.log("RIGHT")
    // }
    switch(event.code) {
        case "KeyA": {
            console.log("LEFT");
            field.clean();
            mask.clean();
            mask.move_left();
            mask.merge();
            apply(mask, field);
            field.show();
            break;
        }
        case "KeyD": {
            console.log("RIGHT");
            field.clean();
            mask.clean();
            mask.move_right();
            mask.merge();
            apply(mask, field);
            field.show();
            break;
        }
        case "KeyW": {
            console.log("TURN");
            field.clean();
            mask.clean();
            mask.turn_figure();
            mask.merge();
            apply(mask, field);
            field.show();
            break;
        }
        default: {
            console.log(event.cod)
        }
    }
})

var speed = 400;
var speed_interval = 0;

var loop = () => {
    figure = new Figure();
    mask = new Mask(FIELD_WIDTH, FIELD_HEIGHT);
    mask.set_figure(figure);
    mask.merge();
    apply(mask, field)
    return setInterval(() => {
        field.clean();
        mask.clean();
        if (mask.step()) {
            mask.merge();
            apply(mask, field);
            field.show();
        }
        else {
            clearInterval(speed_interval);
            speed_interval = 0;
        }
    }, speed);
}

var interval = setInterval(() => {
    if (!speed_interval) {
        speed_interval = loop();
    }
}, 500);





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