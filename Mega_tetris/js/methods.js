'use strict'

const FIELD_WIDTH = 10;
const FIELD_HEIGHT = 20;

class Field {


    constructor() {
        this.__game_fields = $("#game_window .col").get();
        this.field = new Array();
        for (var i = 0; i < this.__game_fields.length; ++i) {
            this.field[i] = false;
        }
    }

    init () {
        this.clean()
        for (var i = 0; i < this.field.length; ++i) {
            this.field[i] = false;
        }
    }

    clean() {
        this.__game_fields.forEach((element) => {
            if ($(element).hasClass("active")) {
                $(element).removeClass("active");
            }
        });
    }

    show() {
        this.__game_fields.forEach((element, index) => {
            if (this.field[index]) {
                $(element).addClass("active");
            }
        });
    }

    set_cell (i, j, value=true) {
        this.field[(i * FIELD_WIDTH) + j] = !!value
    }
}

const __figures = {
    line: [[true, true, true, true]],
    angle_right: [[true, true, true], [false, false, true]],
    angle_left: [[true, true, true], [true, false, false]],
    step_right: [[true, true, false], [false, true, true]],
    step_left: [[false, true, true], [true, true, false]],
    square: [[true, true], [true, true]]
}

const __turns = [0, 3, 2, 1]

var __keys = Object.keys(__figures);

class Figure {
    constructor(size) {
        this.__figure = __figures[
            __keys[Math.floor(Math.random() * __keys.length)]
        ].slice();
        console.log(this.__figure);
        this.__turn = Math.floor(Math.random() * __turns.length);
        this.turn();
        this.__turn = 2;
    }
    turn() {
        for(var t=0; t<=this.__turn; ++t) {
            var tmp_figure = new Array()
            for(var i= this.__figure[0].length - 1; i >= 0; --i) {
                var line = new Array()
                for(var j=0; j<this.__figure.length; ++j) {
                    line.push(this.__figure[j][i]);
                }
                tmp_figure.push(line);
            }
            this.__figure = tmp_figure.slice();
        }
    }
    get() {
        return this.__figure;
    }
    show() {
        console.log(this.__figure);
    }
}

class Mask {
    constructor(width, height) {
        this.__width = width;
        this.__height = height;
        this.__offset_legt = 0;
        this.__offset_top = 0;
        this.__mask = new Array();
        for (var i=0; i< this.__height; ++i) {
            var line = new Array()
            for (var j=0; j < this.__width; ++j) {
                line.push(false);
            }
            this.__mask.push(line);
        }
        console.log(this.__mask)
    }
    set_figure(figure) {
        this.__figure = figure;
        this.__offset_legt = Math.floor(
            (this.__width - this.__figure[0].length) / 2
        );
    }
    turn_figure() {
        this.__figure.turn();
    }
    merge() {

    }
    clean_mask() {
        for (var i = 0; i < this.__height; ++i) {
            for (var j = 0; j < this.__width; ++j) {
                this.__mask[i][j] = false;
            }
        }
    }
    move_right() {
        if ((this.__offset_left + this.__figure[0].length) < this.__width - 1) {
            ++this.__offset_legt;
        }
        this.
    }
    move_left() {
        if (this.__offset_legt > 0) {
            --this.__offset_legt;
        }
    }
    step() {
        if ((this.__offset_top + this.__figure.length)<this.__height - 1) {
            ++this.__offset_top
        }
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