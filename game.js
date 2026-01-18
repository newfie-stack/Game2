// Snake Game JavaScript

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');

// Mobile control buttons
const upBtn = document.getElementById('upBtn');
const downBtn = document.getElementById('downBtn');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

// Game constants
const GRID_SIZE = 20;
const CELL_SIZE = canvas.width / GRID_SIZE;

// Game state
let snake = [
    { x: 5, y: 10 },
    { x: 4, y: 10 },
    { x: 3, y: 10 }
];
let food = { x: 15, y: 10 };
let direction = 'right';
let nextDirection = 'right';
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameLoop = null;
let gameSpeed = 150;
let isPaused = false;
let isGameOver = false;

// Initialize high score display
highScoreElement.textContent = highScore;

// Initialize game
function initGame() {
    snake = [
        { x: 5, y: 10 },
        { x: 4, y: 10 },
        { x: 3, y: 10 }
    ];
    direction = 'right';
    nextDirection = 'right';
    score = 0;
    scoreElement.textContent = score;
    isPaused = false;
    isGameOver = false;
    placeFood();
}

// Place food at random position
function placeFood() {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    food = newFood;
}

// Draw game elements
function draw() {
    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines (subtle)
    ctx.strokeStyle = 'rgba(78, 204, 163, 0.1)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(canvas.width, i * CELL_SIZE);
        ctx.stroke();
    }
    
    // Draw snake
    snake.forEach((segment, index) => {
        const gradient = ctx.createRadialGradient(
            segment.x * CELL_SIZE + CELL_SIZE / 2,
            segment.y * CELL_SIZE + CELL_SIZE / 2,
            0,
            segment.x * CELL_SIZE + CELL_SIZE / 2,
            segment.y * CELL_SIZE + CELL_SIZE / 2,
            CELL_SIZE / 2
        );
        
        if (index === 0) {
            // Head - brighter color
            gradient.addColorStop(0, '#6ee7b7');
            gradient.addColorStop(1, '#4ecca3');
        } else {
            // Body - gradient based on position
            const alpha = 1 - (index / snake.length) * 0.5;
            gradient.addColorStop(0, `rgba(78, 204, 163, ${alpha})`);
            gradient.addColorStop(1, `rgba(50, 150, 120, ${alpha})`);
        }
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(
            segment.x * CELL_SIZE + 1,
            segment.y * CELL_SIZE + 1,
            CELL_SIZE - 2,
            CELL_SIZE - 2,
            4
        );
        ctx.fill();
        
        // Draw eyes on head
        if (index === 0) {
            ctx.fillStyle = '#1a1a2e';
            const eyeSize = CELL_SIZE / 6;
            const eyeOffset = CELL_SIZE / 4;
            
            if (direction === 'right') {
                ctx.beginPath();
                ctx.arc(segment.x * CELL_SIZE + CELL_SIZE - eyeOffset, segment.y * CELL_SIZE + eyeOffset, eyeSize, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(segment.x * CELL_SIZE + CELL_SIZE - eyeOffset, segment.y * CELL_SIZE + CELL_SIZE - eyeOffset, eyeSize, 0, Math.PI * 2);
                ctx.fill();
            } else if (direction === 'left') {
                ctx.beginPath();
                ctx.arc(segment.x * CELL_SIZE + eyeOffset, segment.y * CELL_SIZE + eyeOffset, eyeSize, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(segment.x * CELL_SIZE + eyeOffset, segment.y * CELL_SIZE + CELL_SIZE - eyeOffset, eyeSize, 0, Math.PI * 2);
                ctx.fill();
            } else if (direction === 'up') {
                ctx.beginPath();
                ctx.arc(segment.x * CELL_SIZE + eyeOffset, segment.y * CELL_SIZE + eyeOffset, eyeSize, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(segment.x * CELL_SIZE + CELL_SIZE - eyeOffset, segment.y * CELL_SIZE + eyeOffset, eyeSize, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.arc(segment.x * CELL_SIZE + eyeOffset, segment.y * CELL_SIZE + CELL_SIZE - eyeOffset, eyeSize, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(segment.x * CELL_SIZE + CELL_SIZE - eyeOffset, segment.y * CELL_SIZE + CELL_SIZE - eyeOffset, eyeSize, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    });
    
    // Draw food with pulsing effect
    const pulse = Math.sin(Date.now() / 200) * 2 + 2;
    const foodGradient = ctx.createRadialGradient(
        food.x * CELL_SIZE + CELL_SIZE / 2,
        food.y * CELL_SIZE + CELL_SIZE / 2,
        0,
        food.x * CELL_SIZE + CELL_SIZE / 2,
        food.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2
    );
    foodGradient.addColorStop(0, '#ff6b6b');
    foodGradient.addColorStop(1, '#e94560');
    
    ctx.fillStyle = foodGradient;
    ctx.beginPath();
    ctx.arc(
        food.x * CELL_SIZE + CELL_SIZE / 2,
        food.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2 - 2 + pulse,
        0,
        Math.PI * 2
    );
    ctx.fill();
    
    // Add glow effect to food
    ctx.shadowColor = '#e94560';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
}

// Update game state
function update() {
    if (isPaused || isGameOver) return;
    
    direction = nextDirection;
    
    // Calculate new head position
    const head = { ...snake[0] };
    
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }
    
    // Check for wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        gameOver();
        return;
    }
    
    // Check for self collision
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }
    
    // Add new head
    snake.unshift(head);
    
    // Check for food collision
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        
        // Update high score
        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = highScore;
            localStorage.setItem('snakeHighScore', highScore);
        }
        
        // Increase speed slightly
        if (gameSpeed > 80) {
            gameSpeed -= 2;
            clearInterval(gameLoop);
            gameLoop = setInterval(gameStep, gameSpeed);
        }
        
        placeFood();
    } else {
        // Remove tail if no food eaten
        snake.pop();
    }
}

// Game step
function gameStep() {
    update();
    draw();
}

// Game over
function gameOver() {
    isGameOver = true;
    clearInterval(gameLoop);
    gameLoop = null;
    
    // Draw game over overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#e94560';
    ctx.font = 'bold 36px Segoe UI';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 30);
    
    ctx.fillStyle = '#fff';
    ctx.font = '24px Segoe UI';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 10);
    
    ctx.font = '18px Segoe UI';
    ctx.fillStyle = '#4ecca3';
    ctx.fillText('Press Start to play again', canvas.width / 2, canvas.height / 2 + 50);
    
    startBtn.textContent = 'Play Again';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

// Start game
function startGame() {
    if (gameLoop) {
        clearInterval(gameLoop);
    }
    
    initGame();
    gameSpeed = 150;
    startBtn.textContent = 'Restart';
    pauseBtn.disabled = false;
    pauseBtn.textContent = 'Pause';
    
    gameLoop = setInterval(gameStep, gameSpeed);
    draw();
}

// Toggle pause
function togglePause() {
    if (isGameOver) return;
    
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
    
    if (isPaused) {
        // Draw pause overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#4ecca3';
        ctx.font = 'bold 36px Segoe UI';
        ctx.textAlign = 'center';
        ctx.fillText('Paused', canvas.width / 2, canvas.height / 2);
    }
}

// Handle keyboard input
function handleKeydown(e) {
    const key = e.key.toLowerCase();
    
    // Prevent default for arrow keys to stop page scrolling
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(e.key.toLowerCase())) {
        e.preventDefault();
    }
    
    // Direction controls
    if ((key === 'arrowup' || key === 'w') && direction !== 'down') {
        nextDirection = 'up';
    } else if ((key === 'arrowdown' || key === 's') && direction !== 'up') {
        nextDirection = 'down';
    } else if ((key === 'arrowleft' || key === 'a') && direction !== 'right') {
        nextDirection = 'left';
    } else if ((key === 'arrowright' || key === 'd') && direction !== 'left') {
        nextDirection = 'right';
    } else if (key === ' ') {
        // Space to pause/resume
        if (!isGameOver && gameLoop) {
            togglePause();
        }
    } else if (key === 'enter') {
        // Enter to start/restart
        if (isGameOver || !gameLoop) {
            startGame();
        }
    }
}

// Event listeners
document.addEventListener('keydown', handleKeydown);
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', togglePause);

// Mobile controls
upBtn.addEventListener('click', () => {
    if (direction !== 'down') nextDirection = 'up';
});
downBtn.addEventListener('click', () => {
    if (direction !== 'up') nextDirection = 'down';
});
leftBtn.addEventListener('click', () => {
    if (direction !== 'right') nextDirection = 'left';
});
rightBtn.addEventListener('click', () => {
    if (direction !== 'left') nextDirection = 'right';
});

// Touch event handling for mobile
upBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (direction !== 'down') nextDirection = 'up';
});
downBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (direction !== 'up') nextDirection = 'down';
});
leftBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (direction !== 'right') nextDirection = 'left';
});
rightBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (direction !== 'left') nextDirection = 'right';
});

// Initial draw
draw();
