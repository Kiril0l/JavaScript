'use strict'

const FIELD_WIDTH = 10;
const FIELD_HEIGHT = 20;

class Field {


    constructor() {
        this.__game_fields = $("#game_window .col").get();
        this.__field = new Array();
        for (var i = 0; i < this.__game_fields.length; ++i) {
            this.__field[i] = false;
        }
        this.__result = new Array();
        for (var i = 0; i < this.__game_fields.length; ++i) {
            this.__result[i]= false;
        }
    }

    init () {
        this.clean()
        for (var i = 0; i < this.__field.length; ++i) {
            this.__field[i] = false;
        }
    }

    clean() {
        this.__game_fields.forEach((element) => {
            if ($(element).hasClass("active")) {
                $(element).removeClass("active");
            }
        });
    }

    save_result() {
        this.__result = this.__field.slice();
    }

    show() {
        this.__game_fields.forEach((element, index) => {
            if (this.__field[index]) {
                $(element).addClass("active");
            }
        });
    }

    set_cell (i, j, value=true) {
        this.__field[(i * FIELD_WIDTH) + j] = !!value
    }
    get_result(i, j) {
        return this.field
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
        this.__offset_left = 0;
        this.__offset_top = 0;
        this.__mask = new Array();
        this.__figure = new Array();
        for (var i=0; i< this.__height; ++i) {
            var line = new Array()
            for (var j=0; j < this.__width; ++j) {
                line.push(false);
            }
            this.__mask.push(line);
        }
        this.__step = true;
    }
    set_figure(figure) {
        this.__figure = figure;
        this.__offset_left = Math.floor(
            (this.__width - this.__figure.get()[0].length) / 2
        );
    }
    turn_figure() {
        this.__figure.turn();
        if ((this.__offset_left + this.__figure.get()[0].length) >= FIELD_WIDTH) {
            this.__offset_left = FIELD_WIDTH - this.__figure.get()[0].length
        }
        if ((this.__offset_top + this.__figure.get().length) >= FIELD_HEIGHT) {
            this.__offset_top = FIELD_HEIGHT - this.__figure.get().length
        }
    }

    merge() {
        var figure_data = this.__figure.get();
        for (var i = 0; i < figure_data.length; ++i) {
            for (var j = 0; j < figure_data[0].length; ++j) {
                this.__mask[i + this.__offset_top][j + this.__offset_left] = figure_data[i][j]
            }
        }
    }

    clean() {
        for (var i = 0; i < this.__height; ++i) {
            for (var j = 0; j < this.__width; ++j) {
                this.__mask[i][j] = false;
            }
        }
    }

    move_right() {
        if ((this.__offset_left + this.__figure.get()[0].length) < this.__width) {
            ++this.__offset_left;
        }
    }

    move_left() {
        if (this.__offset_left > 0) {
            --this.__offset_left;
        }
    }

    step() {
        if ((this.__step) || ((this.__offset_top + this.__figure.get().length)<this.__height)) {
            ++this.__offset_top;
            return true;
        }
        return false;
    }

    get_mask() {
        return this.__mask;
    }
    stop() {
        this.__step = false;
    }
}

var apply = (mask, field) => {
    var data = mask.get_mask();
    for (var i = 0; i < FIELD_HEIGHT; ++i) {
        for (var j = 0; j < FIELD_WIDTH; ++j) {
            field.set_cell(i, j, field.get_result(i, j))
            }
        }
    }
    for (var i = 0; i < FIELD_HEIGHT; ++i) {
        for (var j = 0; j < FIELD_WIDTH; ++j) {
            if (!field.get_result(i, j)) {
                field.set_cell(i, j, data[i][j])
            }
            else {
                mask.stop();
                console.error("ERROR")
            }
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