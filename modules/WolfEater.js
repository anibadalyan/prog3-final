var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class WolfEater extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 4;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    } 
    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            wolfEaterHashiv++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 6;
            let wolfeater = new WolfEater(x, y);
            wolfEaterArr.push(wolfeater);
            this.life = 5;
        }
    }
    eat() {
        let emptyCells = this.chooseCell(5);
        let newCell = random(emptyCells);

        if (newCell) {

            this.life++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;

            for (let i in wolfArr) {
                if (wolfArr[i].x == x && wolfArr[i].y == y) {
                    wolfArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;

            if (this.life >= 6) {
                this.mul();
            }
        }
        else {
            this.move()
        }
    }
    move() {
        this.life--;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if (this.life < 0) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in wolfEaterArr) {
            if (wolfEaterArr[i].x == this.x && wolfEaterArr[i].y == this.y) {
                wolfEaterArr.splice(i, 1)
            }
        }
    }
}