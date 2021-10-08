var socket = io();
function setup() {

    var socket = io();

    var side = 20;

    var matrix = [];

    
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let predatorCountElement = document.getElementById('predatorCount');
    let predatorEaterCountElement = document.getElementById('predatorEaterCount');
    let wolfCountElement = document.getElementById('wolfCount');
    let wolfEaterCountElement = document.getElementById('wolfEaterCount');
    let lionCountElement = document.getElementById('lionCount');
  

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
       
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        cellColors = data.cellColors;
         grassEaterCountElement.innerText = data.grassEaterCounter;
         predatorCountElement.innerText = data.predatorCounter;
         predatorEaterCountElement.innerText = data.predatorEaterCounter;
         wolfCountElement.innerText = data.wolfCounter;
         wolfEaterCountElement.innerText = data.wolfEaterCounter;
         lionCountElement.innerText = data.lionCounter;
        createCanvas(matrix[0].length * side, matrix.length * side)
        background('#acacac');
      
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    fill(...cellColors.green);
                   rect(j * side, i * side, side, side);
                
                } else if (matrix[i][j] == 2) {
                    fill(...cellColors.yellow);
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    fill(...cellColors.red);
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill(...cellColors.pink);
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill(...cellColors.blue);
                    rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j] == 6) {
                    fill(...cellColors.purple);
                   rect(j * side, i * side, side, side);
                } 
                else if (matrix[i][j] == 7) {
                    fill(...cellColors.black);
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


function summer() {
    socket.emit("summer")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}
function addPredator() {
    socket.emit("add predator")
}
function addPredatorEater() {
    socket.emit("add predatorEater")
}
function addWolf() {
    socket.emit("add wolf")
}
function addWolfEater() {
    socket.emit("add wolfEater")
}
function addLion() {
    socket.emit("add lion")
}