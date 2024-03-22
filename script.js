const gameBoard = document.querySelector(".game-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let gameOver = false;
let foodX , foodY;
let snakeX = Math.floor(Math.random() * 50) + 1;
let snakeY = Math.floor(Math.random() * 50) + 1;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 50) + 1;
    foodY = Math.floor(Math.random() * 50) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay ...");
    location.reload();
}
const changeDirection = (e) => {
    //console.log(e);
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
    game();
}


const game = () => {
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakeBody.push([foodX,foodY]);
        score++;
        //console.log(snakeBody);
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        highScoreElement.innerText = `High Score: ${highScore}`;
        scoreElement.innerText = `Score: ${score}`;
    }

    for(let i=snakeBody.length-1;i>0;i--){
        snakeBody[i] = snakeBody[i-1];
    }

    snakeBody[0] = [snakeX,snakeY];


    snakeX += velocityX;
    snakeY += velocityY;
    //check if snake's head is out of box
    if(snakeX <= 0 || snakeX > 50 || snakeY <= 0 || snakeY > 50){
        gameOver = true;
    }

    for(let i=0;i<snakeBody.length;i++){
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

        //check snake head hit the body
        if(i!== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true
        }
    }
    gameBoard.innerHTML = htmlMarkup;
}

changeFoodPosition();
setIntervalId = setInterval(game,150);
document.addEventListener("keydown", changeDirection);