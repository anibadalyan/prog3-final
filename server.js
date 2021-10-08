var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("./modules/Predator.js");
var PredatorEater = require("./modules/PredatorEater.js");
var Wolf = require("./modules/Wolf.js");
var WolfEater = require("./modules/WolfEater.js");
var Lion = require("./modules/Lion.js");
let random = require('./modules/random');


grassArr = [];
grassEaterArr = [];
predatorArr = [];
predatorEaterArr = [];
wolfArr = [];
wolfEaterArr = [];
lionArr = [];
matrix = [];
grassHashiv = 0;
grassEaterHashiv = 0;
predatorHashiv = 0;
predatorEaterHashiv = 0;
wolfHashiv = 0;
wolfEaterHashiv = 0;
lionHashiv = 0;
cellColors = {};
cellSettings = {};

function matrixGenerator(matrixSize, grass, grassEater, predator, predatorEater, wolf, wolfEater,lion) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < predatorEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < wolf; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
    for (let i = 0; i < wolfEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 6;
    }
    for (let i = 0; i < lion; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 7;
    }
}
matrixGenerator(20, 20, 10, 15, 10, 7, 5, 2);

var express = require('express');
var fs = require("fs");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);




function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++;
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            } else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
                predatorHashiv++;
            }
            else if (matrix[y][x] == 4) {
                var predatorEater = new PredatorEater(x, y);
                predatorEaterArr.push(predatorEater);
                predatorEaterHashiv++;
            }
            else if (matrix[y][x] == 5) {
                var wolf = new Wolf(x, y);
                wolfArr.push(wolf);
                wolfHashiv++;
            }
            else if (matrix[y][x] == 6) {
                var wolfEater = new WolfEater(x, y);
                wolfEaterArr.push(wolfEater);
                wolfEaterHashiv++;
            }
            else if (matrix[y][x] == 7) {
                var lion = new Lion (x, y);
                lionArr.push(lion);
                lionHashiv++;
            }
        }
    }
}
creatingObjects();

cellColors = {
    white: [255, 255, 255],
    green: [0, 128, 0],
    gren: [0, 128, 0],
    yellow: [255, 255, 0],
    yellow1: [255, 255, 0],
    khaki: [240, 230, 140],
    red: [255, 0, 0],
    red1: [255, 0, 0],
    sakmon: [250, 128, 114],
    pink: [255, 192, 203],
    pink1: [255, 192, 203],
    palevioletred: [219, 112, 147],
    blue: [0, 0, 255],
    blue1: [0, 0, 255],
    lightblue: [135, 206, 235],
    purple: [128, 0, 128],
    purple1: [128, 0, 128],
    plum: [221, 160, 221],
    black: [0, 0, 0],
    black1: [0, 0, 0],
    darkgrey: [105,105,105],

}

function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].eat();
        }
    }
    if (predatorEaterArr[0] !== undefined) {
        for (var i in predatorEaterArr) {
            predatorEaterArr[i].eat();
        }
    }
    if (wolfArr[0] !== undefined) {
        for (var i in wolfArr) {
        wolfArr[i].eat();
        }
    }

    if (wolfEaterArr[0] !== undefined) {
        for (var i in wolfEaterArr) {
            wolfEaterArr[i].eat();
        }
    }
    if (lionArr[0] !== undefined) {
        for (var i in lionArr) {
            lionArr[i].eat();
        }
    }

    let sendData = {
        cellColors: cellColors,
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        predatorCounter: predatorHashiv,
        predatorEaterCounter: predatorEaterHashiv,
        wolfCounter: wolfHashiv,
        wolfEaterCounter: wolfEaterHashiv,
        lionCounter: lionHashiv,

    }



    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)

function kill() {
    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    predatorEaterArr = [];
    wolfArr = [];
    wolfEaterArr = [];
    lionArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
}

function winter() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                cellColors.green = cellColors.white

            }
            else if (matrix[y][x] == 2) {
                cellColors.yellow = cellColors.khaki

            }
            else if (matrix[y][x] == 3) {
                cellColors.red = cellColors.sakmon
            }
            else if (matrix[y][x] == 4) {
                cellColors.pink = cellColors.palevioletred
            }
            else if (matrix[y][x] == 5) {
                cellColors.blue = cellColors.lightblue
            }
            else if (matrix[y][x] == 6) {
                cellColors.purple = cellColors.plum
            }
            else if (matrix[y][x] == 7) {
                cellColors.black = cellColors.darkgrey
            }
        }
    }
}
function summer() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                cellColors.green = cellColors.gren
            }
            else if (matrix[y][x] == 2) {
                cellColors.yellow = cellColors.yellow1
            }
            else if (matrix[y][x] == 3) {
                cellColors.red = cellColors.red1
            }
            else if (matrix[y][x] == 4) {
                cellColors.pink = cellColors.pink1
            }
            else if (matrix[y][x] == 5) {
                cellColors.blue = cellColors.blue1
            }
            else if (matrix[y][x] == 6) {
                cellColors.purple = cellColors.purple1
            }
            else if (matrix[y][x] == 7) {
                cellColors.black = cellColors.black1
            }
        }
    }
}
function addGrass() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
            grassHashiv++;
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
    for (var i = 0; i < 4; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y,2))
            grassEaterHashiv++;
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addPredator() {
    for (var i = 0; i < 4; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            predatorArr.push(new Predator (x, y, 3))
            predatorHashiv++;
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addPredatorEater() {
    for (var i = 0; i < 4; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            predatorEaterArr.push(new PredatorEater (x, y,4))
            predatorEaterHashiv++;
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addWolf() {
    for (var i = 0; i < 4; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            wolfArr.push(new Wolf (x, y,5))
            wolfHashiv++;
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addWolfEater() {
    for (var i = 0; i < 4; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 6
            wolfEaterArr.push(new WolfEater (x, y,6))
            wolfEaterHashiv++;
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addLion() {
    for (var i = 0; i < 4; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 7
            lionArr.push(new Lion (x, y,7))
            lionHashiv++;
        }
    }
    io.sockets.emit("send matrix", matrix);
}

io.on('connection', function (socket) {
    socket.on("kill", kill);
    socket.on("winter", winter);
    socket.on("summer", summer);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add predator", addPredator);
    socket.on("add predatorEater", addPredatorEater);
    socket.on("add wolf", addWolf);
    socket.on("add wolfEater", addWolfEater);
    socket.on("add lion", addLion);
});
var statistics = {};
setInterval(function() {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.predator = predatorArr.length;
    statistics.predatorEater = predatorEaterArr.length;
    statistics.wolf = wolfArr.length;
    statistics.wolfEater = wolfEaterArr.length;
    statistics.lion = lionArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
        console.log("send")
    })
},1000)