//document.body.style.border = "5px solid red";

paddle1Y = paddle2Y = 40;
paddleThickness = 10;
paddleHeight = 100;
ballX = ballY = 50;
xVelocity = yVelocity = 4;
ballDemension = 6;
score1 = score2 = 0;
aiSpeed = 5;

window.onload=function() { //call code as soon as game starts

	document.body.style.border = "5px solid red";
	
	document.body.innerHTML += '<canvas id="gameCanvas" width="640" height="640"></canvas>'; // the += means we add this to the inner HTML of body
	document.getElementById('gameCanvas').innerHTML = '<canvas id="gameCanvas" width="640" height="640"></canvas>'; // replaces the inner HTML of #gameCanvas to a canvas

    canvas = document.getElementById('gameCanvas'); //get canvas from html page
    
    canvasContext = canvas.getContext('2d'); //gets graphics stuff or something
    
    setInterval(update, 1000/30); //calls the function update() 30 times a second
    
    addEventListener('mousemove', function(e) {
        paddle1Y = e.clientY - paddleHeight / 2;
    })
}

function update() { //this function is beeing called 30 times a second from the onload function
    
    //move ball
    ballX += xVelocity;
    ballY += yVelocity;
    
    if (ballY < 0 && yVelocity < 0) // if the ball is above the screen and its moving upward, reverse velocity
    {
        yVelocity = -yVelocity;
    }
    if (ballY > canvas.height && yVelocity > 0) // if the ball is above the screen and its moving downward, reverse velocity
    {
        yVelocity = -yVelocity;
    }
    if (ballX < 0) // left side
    {
        if(ballY > paddle1Y && ballY < paddle1Y + paddleHeight) //did ball land on paddle?
        {
             xVelocity = -xVelocity;
            deltaY = ballY - (paddle1Y + paddleHeight / 2);
            yVelocity = deltaY * 0.3;
        } else {
            score2++;
            reset();
        }
    }
    if (ballX > canvas.width) // left side
    {
        if(ballY > paddle2Y && ballY < paddle2Y + paddleHeight) //did ball land on paddle?
        {
             xVelocity = -xVelocity;
            deltaY = ballY - (paddle2Y + paddleHeight / 2);
            yVelocity = deltaY * 0.3;
        } else {
            score1++;
            reset();
        }
    }
    
    if (paddle2Y + paddleHeight / 2 < ballY) {
        paddle2Y += aiSpeed;
    } else {
        paddle2Y -= aiSpeed;
    }
    
    //draw backround
    canvasContext.fillStyle = 'black'; //canvas will be black at the start of each frame
    canvasContext.fillRect(0,0,canvas.width,canvas.height); //create backround rectangel
    
    //draw paddles
    canvasContext.fillStyle = 'white'; //paddles will be white
    canvasContext.fillRect(0,paddle1Y,paddleThickness,paddleHeight); //paddle 1
    canvasContext.fillRect(canvas.width-paddleThickness,paddle2Y,paddleThickness,paddleHeight); //paddle 2
    
    //draw ball
    canvasContext.fillRect(ballX-ballDemension/2,ballY-ballDemension/2,ballDemension,ballDemension); //place ball and give size
    
    //draw scores
    canvasContext.fillText(score1,100,100)
    canvasContext.fillText(score2,canvas.width-100,100)
    
    
    
}

function reset() {
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    
    xVelocity = -xVelocity;
    yVelocity = 3;
}