var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class Wolf extends LiveForm {
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
            wolfHashiv++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            let wolf = new Wolf(x, y);
            wolfArr.push(wolf);
            this.life = 5;
        }
    }
    eat() {
        let emptyCells = this.chooseCell(4);
        let newCell = random(emptyCells);

        if (newCell) {

            this.life++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            for (let i in predatorEaterArr) {
                if (predatorEaterArr[i].x == x && predatorEaterArr[i].y == y) {
                    predatorEaterArr.splice(i, 1)
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
            matrix[y][x] = 5;
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

        for (let i in wolfArr) {
            if (wolfArr[i].x == this.x && wolfArr[i].y == this.y) {
                wolfArr.splice(i, 1)
            }
        }
    }
}