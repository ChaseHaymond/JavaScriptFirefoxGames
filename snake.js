var newDirection = 1;

var arrayOfX = new Array();
var arrayOfY = new Array();

// var newSquareX = 0;
// var newSquareY = 0;

window.onload=function() { //call code as soon as game starts


    newHTML = ('<canvas id="gameCanvas" width="640" height="640"></canvas>' + document.body.innerHTML);
    document.body.innerHTML = newHTML;

    //document.body.innerHTML += '<canvas id="gameCanvas" width="640" height="640"></canvas>'; // the += means we add this to the inner HTML of body
    document.getElementById('gameCanvas').innerHTML = '<canvas id="gameCanvas" width="640" height="640"></canvas>'; // replaces the inner HTML of #gameCanvas to a canvas

    canvas = document.getElementById('gameCanvas'); //get canvas from html page
    
    canvasContext = canvas.getContext('2d'); //gets graphics stuff or something
    
    canvasContext = canvas.getContext('2d'); //gets graphics stuff or something

    squareX = ((canvas.width - (canvas.width % 10))) / 2;
    squareY = ((canvas.height - (canvas.height % 10))) / 2;

    arrayOfX.push(squareX);
    arrayOfY.push(squareY);

    newSquareX = getNewX();
    newSquareY = getNewY();

    setInterval(update, 1000/30); //calls the function update() 30 times a second
    
    window.onkeydown = function(e) {
    newDirection = {37: -1, 38: -2, 39: 1, 40: 2}[e.keyCode] || newDirection;
        moveSquare();
    };
}

function update() { 
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0,0,canvas.width, canvas.height);

    for (var i = arrayOfX.length - 1; i >= 0; i--) {
        canvasContext.fillStyle = 'white';
        canvasContext.fillRect(arrayOfX[i], arrayOfY[i], 10, 10);
    }
    

    canvasContext.fillStyle = 'red';
    canvasContext.fillRect(newSquareX, newSquareY, 10, 10);

    if (arrayOfX[0] == newSquareX && arrayOfY[0] == newSquareY)
    {
        newSquareX = getNewX();
        newSquareY = getNewY();

        arrayOfX.push(arrayOfX[arrayOfX.length-1]-10);
        arrayOfY.push(arrayOfY[arrayOfY.length-1]-10);
    }
}

function getNewX() {
    randomX = Math.floor(Math.random() * canvas.width);
    return randomX - (randomX % 10);
}

function getNewY() {
    randomY = Math.floor(Math.random() * canvas.height);
    return randomY - (randomY % 10);
}

function moveSquare() {
    if (newDirection == -1) {
        for (var i = arrayOfX.length - 1; i >= 0; i--) {
            arrayOfX[i] -= 10;
        }
    } else if (newDirection == 1) {
        for (var i = arrayOfX.length - 1; i >= 0; i--) {
            arrayOfX[i] += 10;
        }
    } else if (newDirection == -2) {
        for (var i = arrayOfX.length - 1; i >= 0; i--) {
            arrayOfY[i] -= 10;
        }
    } else if (newDirection == 2) {
        for (var i = arrayOfX.length - 1; i >= 0; i--) {
            arrayOfY[i] += 10;
        }
    }

    squareX = arrayOfX[0];
    squareY = arrayOfY[0];

    if(squareX > canvas.width) {
        squareX = 0;
    }

    if(squareX < 0) {
        squareX = canvas.width;
    }

    if(squareY > canvas.height) {
        squareY = 0;
    }

    if(squareY < 0) {
        squareY = canvas.height;
    }
}