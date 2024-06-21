// script.js

let canvas;
let ctx;
let snake;
let food;
let snakeDirection;
let gameInterval;
let gameSpeed = 100; // Adjust game speed (lower value means faster)

function startGame() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    snake = [{ x: 200, y: 200 }]; // Initial snake position
    snakeDirection = 'right'; // Initial snake direction

    createFood();

    if (gameInterval) {
        clearInterval(gameInterval);
    }

    gameInterval = setInterval(gameLoop, gameSpeed);

    // Listen for arrow key presses to change snake direction
    document.addEventListener('keydown', changeDirection);
}

function gameLoop() {
    moveSnake();
    if (checkCollision()) {
        gameOver();
        return;
    }
    drawCanvas();
    drawSnake();
    drawFood();
}

function moveSnake() {
    // Create a new head based on current direction
    let head = { x: snake[0].x, y: snake[0].y };
    switch (snakeDirection) {
        case 'up':
            head.y -= 20;
            break;
        case 'down':
            head.y += 20;
            break;
        case 'left':
            head.x -= 20;
            break;
        case 'right':
            head.x += 20;
            break;
    }

    // Add new head to beginning of snake array
    snake.unshift(head);

    // Check if snake has eaten food
    if (head.x === food.x && head.y === food.y) {
        createFood();
    } else {
        // Remove tail segment if snake did not eat food
        snake.pop();
    }
}

function checkCollision() {
    // Check collision with walls or itself
    let head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true; // Collision with walls
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true; // Collision with itself
        }
    }
    return false;
}

function createFood() {
    // Randomly position food within canvas
    let x = Math.floor(Math.random() * canvas.width / 20) * 20;
    let y = Math.floor(Math.random() * canvas.height / 20) * 20;

    // Ensure food does not overlap with snake
    for (let segment of snake) {
        if (segment.x === x && segment.y === y) {
            return createFood();
        }
    }

    food = { x: x, y: y };
}

function drawCanvas() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    // Draw each segment of the snake
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, 20, 20); // Adjust size based on CSS
    });
}

function drawFood() {
    // Draw food item
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 20, 20); // Adjust size based on CSS
}

function changeDirection(event) {
    // Change snake direction based on arrow key press
    switch (event.key) {
        case 'ArrowUp':
            if (snakeDirection !== 'down') snakeDirection = 'up';
            break;
        case 'ArrowDown':
            if (snakeDirection !== 'up') snakeDirection = 'down';
            break;
        case 'ArrowLeft':
            if (snakeDirection !== 'right') snakeDirection = 'left';
            break;
        case 'ArrowRight':
            if (snakeDirection !== 'left') snakeDirection = 'right';
            break;
    }
}

function gameOver() {
    clearInterval(gameInterval);
    alert('Game Over! Your score: ' + (snake.length - 1));
}
