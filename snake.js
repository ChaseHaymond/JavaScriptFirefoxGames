var newDirection = 1;

var arrayOfX = new Array();
var arrayOfY = new Array();

var prevDirection = 1;

var midX = 0;
var midY = 0;

var interval = setInterval(update, 1000/15); //calls the function update() 30 times a second

window.onload=function() { //call code as soon as game starts


    newHTML = ('<canvas id="gameCanvas" width="640" height="640"></canvas>' + document.body.innerHTML);
    document.body.innerHTML = newHTML;

    //document.body.innerHTML += '<canvas id="gameCanvas" width="640" height="640"></canvas>'; // the += means we add this to the inner HTML of body

    // replaces the inner HTML of #gameCanvas to a canvas
    document.getElementById('gameCanvas').innerHTML = '<canvas id="gameCanvas" width="640" height="640"></canvas>'; 

    canvas = document.getElementById('gameCanvas'); //get canvas from html page
    
    canvasContext = canvas.getContext('2d'); //gets graphics stuff
    
    canvasContext = canvas.getContext('2d'); //gets graphics stuff

    midX = squareX = ((canvas.width - (canvas.width % 10))) / 2;
    midY = squareY = ((canvas.height - (canvas.height % 10))) / 2;

    arrayOfX.push(squareX);
    arrayOfY.push(squareY);

    newSquareX = squareX;
    newSquareY = squareY;

    
    
    

    window.onkeydown = function(e) {
    	newDirection = {37: -1, 38: -2, 39: 1, 40: 2}[e.keyCode] || newDirection;
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

        arrayOfX.push(arrayOfX[arrayOfX.length-1]);
        arrayOfY.push(arrayOfY[arrayOfY.length-1]-10);
    }

    moveSquare();
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
    if (newDirection == -1 && prevDirection != 1) { //left
    	arrayOfX[0] -= 10;
        for (var i = arrayOfX.length - 1; i >= 1; i--) {
        	//arrayOfX[0] -= 10;
            arrayOfX[i] = arrayOfX[i-1];
            arrayOfY[i] = arrayOfY[i-1];
        }
        prevDirection = newDirection;
    } else if (newDirection == 1 && prevDirection != -1) { //right
    	arrayOfX[0] += 10;
        for (var i = arrayOfX.length - 1; i >= 1; i--) {
            //arrayOfX[i] += 10;
            arrayOfX[i] = arrayOfX[i-1];
            arrayOfY[i] = arrayOfY[i-1];
        }
        prevDirection = newDirection;
    } else if (newDirection == -2 && prevDirection != 2) { //up
    	arrayOfY[0] -= 10;
        for (var i = arrayOfX.length - 1; i >= 1; i--) {
            //arrayOfY[i] -= 10;
            arrayOfX[i] = arrayOfX[i-1];
            arrayOfY[i] = arrayOfY[i-1];
        }
        prevDirection = newDirection;
    } else if (newDirection == 2 && prevDirection != -2) { //down
    	arrayOfY[0] += 10;
        for (var i = arrayOfX.length - 1; i >= 1; i--) {
            //arrayOfY[i] += 10;
            arrayOfX[i] = arrayOfX[i-1];
            arrayOfY[i] = arrayOfY[i-1];
        }
        prevDirection = newDirection;
    }
    newDirection = prevDirection;

    squareX = arrayOfX[0];
    squareY = arrayOfY[0];

    if(squareX > canvas.width) {
        gameOver();
    }

    if(squareX < 0) {
        gameOver();
    }

    if(squareY > canvas.height) {
        gameOver();
    }

    if(squareY < 0) {
        gameOver();
    }
}

function gameOver() {
	canvasContext.fillStyle = 'red';
	canvasContext.fillRect(0,0,canvas.width, canvas.height);
	canvasContext.fillStyle = 'Black';
	canvasContext.font = "30px Arial";
	canvasContext.fillText("Game Over", midX - 75, midY);

	clearInterval(interval);
}