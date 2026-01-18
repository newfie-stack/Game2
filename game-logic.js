// Snake Game Core Logic
// This module contains the testable game logic functions

const GRID_SIZE = 20;

/**
 * Creates the initial snake state
 * @returns {Array} Array of snake segments
 */
function createInitialSnake() {
  return [
    { x: 5, y: 10 },
    { x: 4, y: 10 },
    { x: 3, y: 10 }
  ];
}

/**
 * Creates a random food position that doesn't overlap with the snake
 * @param {Array} snake - Array of snake segments
 * @param {number} gridSize - Size of the grid
 * @returns {Object} Food position with x and y coordinates
 */
function createFoodPosition(snake, gridSize = GRID_SIZE) {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize)
    };
  } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
  return newFood;
}

/**
 * Calculates the new head position based on direction
 * @param {Object} currentHead - Current head position
 * @param {string} direction - Direction of movement
 * @returns {Object} New head position
 */
function calculateNewHeadPosition(currentHead, direction) {
  const head = { ...currentHead };
  
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
  
  return head;
}

/**
 * Checks if the snake collides with walls
 * @param {Object} head - Head position
 * @param {number} gridSize - Size of the grid
 * @returns {boolean} True if collision with wall
 */
function checkWallCollision(head, gridSize = GRID_SIZE) {
  return head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize;
}

/**
 * Checks if the snake collides with itself
 * @param {Object} head - New head position
 * @param {Array} snake - Snake body (excluding head)
 * @returns {boolean} True if collision with self
 */
function checkSelfCollision(head, snake) {
  return snake.some(segment => segment.x === head.x && segment.y === head.y);
}

/**
 * Checks if the head is at the food position
 * @param {Object} head - Head position
 * @param {Object} food - Food position
 * @returns {boolean} True if head is at food position
 */
function checkFoodCollision(head, food) {
  return head.x === food.x && head.y === food.y;
}

/**
 * Validates if a direction change is allowed
 * @param {string} newDirection - New direction to change to
 * @param {string} currentDirection - Current direction
 * @returns {boolean} True if direction change is allowed
 */
function isValidDirectionChange(newDirection, currentDirection) {
  const opposites = {
    'up': 'down',
    'down': 'up',
    'left': 'right',
    'right': 'left'
  };
  
  return opposites[newDirection] !== currentDirection;
}

/**
 * Updates the snake position after a move
 * @param {Array} snake - Current snake array
 * @param {Object} newHead - New head position
 * @param {boolean} ateFood - Whether food was eaten
 * @returns {Array} Updated snake array
 */
function updateSnakePosition(snake, newHead, ateFood) {
  const newSnake = [newHead, ...snake];
  
  if (!ateFood) {
    newSnake.pop(); // Remove tail if no food eaten
  }
  
  return newSnake;
}

/**
 * Calculates the new game speed based on score
 * @param {number} currentSpeed - Current game speed (ms)
 * @param {number} minSpeed - Minimum speed (fastest)
 * @returns {number} New game speed
 */
function calculateNewSpeed(currentSpeed, minSpeed = 80) {
  if (currentSpeed > minSpeed) {
    return currentSpeed - 2;
  }
  return currentSpeed;
}

/**
 * Maps keyboard input to direction
 * @param {string} key - Keyboard key pressed
 * @returns {string|null} Direction or null if not a direction key
 */
function mapKeyToDirection(key) {
  const keyMap = {
    'ArrowUp': 'up',
    'w': 'up',
    'W': 'up',
    'ArrowDown': 'down',
    's': 'down',
    'S': 'down',
    'ArrowLeft': 'left',
    'a': 'left',
    'A': 'left',
    'ArrowRight': 'right',
    'd': 'right',
    'D': 'right'
  };
  
  return keyMap[key] || null;
}

// Export for Node.js testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    GRID_SIZE,
    createInitialSnake,
    createFoodPosition,
    calculateNewHeadPosition,
    checkWallCollision,
    checkSelfCollision,
    checkFoodCollision,
    isValidDirectionChange,
    updateSnakePosition,
    calculateNewSpeed,
    mapKeyToDirection
  };
}
