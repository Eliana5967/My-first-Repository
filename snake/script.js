// Define constants
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

// Initial snake position
let snake = [];

// Initial food position
let food = {
    x: Math.floor(Math.random() * columns),
    y: Math.floor(Math.random() * rows)
};

// Initial direction
let direction;

// Event listener for key presses to control snake direction
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && direction !== "right") {
        direction = "left";
    } else if (event.key === "ArrowUp" && direction !== "down") {
        direction = "up";
    } else if (event.key === "ArrowRight" && direction !== "left") {
        direction = "right";
    } else if (event.key === "ArrowDown" && direction !== "up") {
        direction = "down";
    }
});

// Function to draw everything on the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the snake
    ctx.fillStyle = "green";
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * scale, snake[i].y * scale, scale, scale);
    }

    // Draw the food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * scale, food.y * scale, scale, scale);

    // Move the snake
    let headX = snake[0].x;
    let headY = snake[0].y;

    // Determine direction of movement
    if (direction === "left") headX--;
    else if (direction === "up") headY--;
    else if (direction === "right") headX++;
    else if (direction === "down") headY++;

    // Check if snake eats food
    if (headX === food.x && headY === food.y) {
        // Increase snake length
        snake.unshift({ x: headX, y: headY });

        // Generate new food position
        food = {
            x: Math.floor(Math.random() * columns),
            y: Math.floor(Math.random() * rows)
        };
    } else {
        // Remove the tail
        snake.pop();
    }

    // Game over conditions
    if (headX < 0 || headX >= columns || headY < 0 || headY >= rows || checkCollision(headX, headY)) {
        clearInterval(gameInterval);
        alert("Game Over! Your score: " + (snake.length - 1));
        window.location.reload();
    }

    // Add new head position
    let newHead = {
        x: headX,
        y: headY
    };
    snake.unshift(newHead);
}

// Function to check collision with itself
function checkCollision(x, y) {
    for (let i = 1; i < snake.length; i++) {
        if (x === snake[i].x && y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Start the game loop
let gameInterval = setInterval(draw, 100);
