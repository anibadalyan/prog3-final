var socket = io();
function setup() {

    var socket = io();

    var side = 30;

    var matrix = [];

    
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let predatorCountElement = document.getElementById('predatorCount');
    let predatorEaterCountElement = document.getElementById('predatorEaterCount');
    let wolfCountElement = document.getElementById('wolfCount');

  

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
       
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
    
         grassEaterCountElement.innerText = data.grassEaterCounter;
         predatorCountElement.innerText = data.predatorCounter;
         predatorEaterCountElement.innerText = data.predatorEaterCounter;
         wolfCountElement.innerText = data.wolfCounter;
        createCanvas(matrix[0].length * side, matrix.length * side)
        background('#acacac');
       frameRate(1);
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1 ) {
                    fill("green");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    fill("orange");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill('pink');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill('blue');
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
} 
function kill() {
    socket.emit("kill")
}

function winter() {
    socket.emit("winter")
}


// function winter() {
//     socket.emit("winter")
// }