'use strict'

const FIELD_WIDTH = 10;
const FIELD_HEIGHT = 20;

class Field {


    constructor() {
        this.game_fields = $("#game_window .col").get();
        this.field = new Array();
        for (var i = 0; i < this.game_fields.length; ++i) {
            this.field[i] = false;
        }
    }

    init () {
        this.clean()
        for (var i = 0; i < field.length; ++i) {
            this.field[i] = false;
        }
    }

    clean() {
        this.game_fields.forEach((element) => {
            if ($(element).hasClass("active")) {
                $(element).removeClass("active");
            }
        });
    }

    show() {
        this.game_fields.forEach((element, index) => {
            if (this.field[index]) {
                $(element).addClass("active");
            }
        });
    }

    set_cell (i, j, value=true) {
        this.field[(i * FIELD_WIDTH) + j] = !!value
    }
}

const figures = {
    line: [true, true, true, true, false, false, false, false],
    angle_right: [true, true, true, false, false, false, true, false],
    angle_left: [true, true, true, false, true, false, false, false],
    step_right: [true, true, false, false, false, true, true, false],
    step_left: [false, true, true, false, true, true, false, false],
    square: [true, true, false, false, true, true, false, false]
}

const turns = [0, 90, 180, 270]

class Figure {
    constructor(size) {
        this.mask = new Array()
        for (var i=0; i<size; ++i) {
            this.mask[i] = false;
        }
        this.figure = figures[Math.floor(Math.random() * figures.length)]
    }
}





// set_col(6,5, 1);
// show(field);

// set_col(4,6, true);
// show(field);


// clean();

// for (var i = 0; i < field.length; i+= len_str) {
//     for (var j = 0; j < len_str; ++j) {
//         console.log(i+j);
//     }
// }

// field[(4*len_str)+4] = 1
// field[(6*len_str)+2] = 1
// show(field)