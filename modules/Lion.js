var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class Lion extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 3;
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
            lionHashiv++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 7;
            let  lion = new Lion(x, y);
            lionArr.push(lion);
            this.life = 4;
        }
    }
    eat() {
        let emptyCells = this.chooseCell(6);
        let newCell = random(emptyCells);

        if (newCell) {

            this.life++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 7;
            matrix[this.y][this.x] = 0;

            for (let i in wolfEaterArr) {
                if (wolfEaterArr[i].x == x && wolfEaterArr[i].y == y) {
                    wolfEaterArr.splice(i, 1)
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
            matrix[y][x] = 7;
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

        for (let i in  lionArr) {
            if ( lionArr[i].x == this.x &&  lionArr[i].y == this.y) {
                lionArr.splice(i, 1)
            }
        }
    }
}