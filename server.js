var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("./modules/Predator.js");
var PredatorEater = require("./modules/PredatorEater.js");
var Wolf = require("./modules/Wolf.js");
let random = require('./modules/random');


grassArr = [];
grassEaterArr = [];
predatorArr = [];
predatorEaterArr = [];
wolfArr = [];
matrix = [];
grassHashiv = 0;
grassEaterHashiv = 0;
predatorHashiv = 0;
predatorEaterHashiv = 0;
wolfHashiv = 0;

function matrixGenerator(matrixSize, grass, grassEater, predator, predatorEater, wolf) {
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
}
matrixGenerator(20, 15, 10, 7, 5, 3);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



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
        }
    }
}
creatingObjects();

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
        for (var i in wolfArr) {
            wolfArr[i].eat();
        }
    }
    if (predatorEaterArr[0] !== undefined) {
        for (var i in predatorEaterArr) {
            predatorEaterArr[i].eat();
        }
    }


    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        predatorCounter: predatorHashiv,
        predatorEaterCounter: predatorEaterHashiv,
        wolfCounter: wolfHashiv,

    }


    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)

function kill() {
    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    predatorEaterArr = [];
    wolfArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
}
function winter() {
}
function summer() {
}
    io.on('connection', function (socket) {
        socket.on("kill", kill);
        socket.on("winter", winter);
        socket.on("summer", summer);
    });

// function winter() {


//     io.sockets.emit("data", matrix);
// }
// io.on('connection', function (socket) {
//     socket.on("kill", kill);
// });