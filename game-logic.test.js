/**
 * Tests for Snake Game Core Logic
 */

const {
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
} = require('./game-logic');

describe('Snake Game Core Logic', () => {
  
  describe('createInitialSnake', () => {
    test('should create a snake with 3 segments', () => {
      const snake = createInitialSnake();
      expect(snake).toHaveLength(3);
    });

    test('should create snake segments with x and y coordinates', () => {
      const snake = createInitialSnake();
      snake.forEach(segment => {
        expect(segment).toHaveProperty('x');
        expect(segment).toHaveProperty('y');
      });
    });

    test('should create snake segments in a horizontal line', () => {
      const snake = createInitialSnake();
      const y = snake[0].y;
      snake.forEach(segment => {
        expect(segment.y).toBe(y);
      });
    });

    test('should create snake segments in consecutive x positions', () => {
      const snake = createInitialSnake();
      expect(snake[0].x - snake[1].x).toBe(1);
      expect(snake[1].x - snake[2].x).toBe(1);
    });
  });

  describe('createFoodPosition', () => {
    test('should create food with x and y coordinates', () => {
      const snake = createInitialSnake();
      const food = createFoodPosition(snake);
      expect(food).toHaveProperty('x');
      expect(food).toHaveProperty('y');
    });

    test('should create food within grid bounds', () => {
      const snake = createInitialSnake();
      const food = createFoodPosition(snake, GRID_SIZE);
      expect(food.x).toBeGreaterThanOrEqual(0);
      expect(food.x).toBeLessThan(GRID_SIZE);
      expect(food.y).toBeGreaterThanOrEqual(0);
      expect(food.y).toBeLessThan(GRID_SIZE);
    });

    test('should not place food on snake position', () => {
      const snake = createInitialSnake();
      // Run multiple times to test randomness
      for (let i = 0; i < 100; i++) {
        const food = createFoodPosition(snake);
        const isOnSnake = snake.some(
          segment => segment.x === food.x && segment.y === food.y
        );
        expect(isOnSnake).toBe(false);
      }
    });
  });

  describe('calculateNewHeadPosition', () => {
    const head = { x: 5, y: 5 };

    test('should move up correctly', () => {
      const newHead = calculateNewHeadPosition(head, 'up');
      expect(newHead).toEqual({ x: 5, y: 4 });
    });

    test('should move down correctly', () => {
      const newHead = calculateNewHeadPosition(head, 'down');
      expect(newHead).toEqual({ x: 5, y: 6 });
    });

    test('should move left correctly', () => {
      const newHead = calculateNewHeadPosition(head, 'left');
      expect(newHead).toEqual({ x: 4, y: 5 });
    });

    test('should move right correctly', () => {
      const newHead = calculateNewHeadPosition(head, 'right');
      expect(newHead).toEqual({ x: 6, y: 5 });
    });

    test('should not modify original head', () => {
      const originalHead = { x: 5, y: 5 };
      calculateNewHeadPosition(originalHead, 'up');
      expect(originalHead).toEqual({ x: 5, y: 5 });
    });
  });

  describe('checkWallCollision', () => {
    test('should detect collision with left wall', () => {
      expect(checkWallCollision({ x: -1, y: 5 })).toBe(true);
    });

    test('should detect collision with right wall', () => {
      expect(checkWallCollision({ x: GRID_SIZE, y: 5 })).toBe(true);
    });

    test('should detect collision with top wall', () => {
      expect(checkWallCollision({ x: 5, y: -1 })).toBe(true);
    });

    test('should detect collision with bottom wall', () => {
      expect(checkWallCollision({ x: 5, y: GRID_SIZE })).toBe(true);
    });

    test('should not detect collision within grid', () => {
      expect(checkWallCollision({ x: 5, y: 5 })).toBe(false);
    });

    test('should not detect collision at grid edges', () => {
      expect(checkWallCollision({ x: 0, y: 0 })).toBe(false);
      expect(checkWallCollision({ x: GRID_SIZE - 1, y: GRID_SIZE - 1 })).toBe(false);
    });
  });

  describe('checkSelfCollision', () => {
    test('should detect collision with snake body', () => {
      const snake = [{ x: 4, y: 5 }, { x: 3, y: 5 }, { x: 2, y: 5 }];
      const head = { x: 3, y: 5 };
      expect(checkSelfCollision(head, snake)).toBe(true);
    });

    test('should not detect collision when head is in safe position', () => {
      const snake = [{ x: 4, y: 5 }, { x: 3, y: 5 }, { x: 2, y: 5 }];
      const head = { x: 5, y: 5 };
      expect(checkSelfCollision(head, snake)).toBe(false);
    });

    test('should handle empty snake array', () => {
      expect(checkSelfCollision({ x: 5, y: 5 }, [])).toBe(false);
    });
  });

  describe('checkFoodCollision', () => {
    test('should detect when head is at food position', () => {
      const head = { x: 5, y: 5 };
      const food = { x: 5, y: 5 };
      expect(checkFoodCollision(head, food)).toBe(true);
    });

    test('should not detect when head is not at food position', () => {
      const head = { x: 5, y: 5 };
      const food = { x: 10, y: 10 };
      expect(checkFoodCollision(head, food)).toBe(false);
    });
  });

  describe('isValidDirectionChange', () => {
    test('should allow changing from right to up', () => {
      expect(isValidDirectionChange('up', 'right')).toBe(true);
    });

    test('should allow changing from right to down', () => {
      expect(isValidDirectionChange('down', 'right')).toBe(true);
    });

    test('should not allow changing from right to left (opposite)', () => {
      expect(isValidDirectionChange('left', 'right')).toBe(false);
    });

    test('should not allow changing from up to down (opposite)', () => {
      expect(isValidDirectionChange('down', 'up')).toBe(false);
    });

    test('should not allow changing from down to up (opposite)', () => {
      expect(isValidDirectionChange('up', 'down')).toBe(false);
    });

    test('should not allow changing from left to right (opposite)', () => {
      expect(isValidDirectionChange('right', 'left')).toBe(false);
    });

    test('should allow same direction (no change)', () => {
      expect(isValidDirectionChange('up', 'up')).toBe(true);
    });
  });

  describe('updateSnakePosition', () => {
    test('should add new head and remove tail when not eating food', () => {
      const snake = [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 }
      ];
      const newHead = { x: 6, y: 5 };
      const updatedSnake = updateSnakePosition(snake, newHead, false);
      
      expect(updatedSnake).toHaveLength(3);
      expect(updatedSnake[0]).toEqual(newHead);
      expect(updatedSnake[1]).toEqual({ x: 5, y: 5 });
      expect(updatedSnake[2]).toEqual({ x: 4, y: 5 });
    });

    test('should add new head and keep tail when eating food', () => {
      const snake = [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 }
      ];
      const newHead = { x: 6, y: 5 };
      const updatedSnake = updateSnakePosition(snake, newHead, true);
      
      expect(updatedSnake).toHaveLength(4);
      expect(updatedSnake[0]).toEqual(newHead);
      expect(updatedSnake[3]).toEqual({ x: 3, y: 5 });
    });

    test('should not modify original snake array', () => {
      const snake = [{ x: 5, y: 5 }];
      const newHead = { x: 6, y: 5 };
      updateSnakePosition(snake, newHead, false);
      
      expect(snake).toHaveLength(1);
      expect(snake[0]).toEqual({ x: 5, y: 5 });
    });
  });

  describe('calculateNewSpeed', () => {
    test('should decrease speed by 2 when above minimum', () => {
      expect(calculateNewSpeed(150)).toBe(148);
    });

    test('should not decrease speed below minimum', () => {
      expect(calculateNewSpeed(80)).toBe(80);
      expect(calculateNewSpeed(79)).toBe(79);
    });

    test('should respect custom minimum speed', () => {
      expect(calculateNewSpeed(100, 100)).toBe(100);
      expect(calculateNewSpeed(100, 50)).toBe(98);
    });
  });

  describe('mapKeyToDirection', () => {
    test('should map arrow keys correctly', () => {
      expect(mapKeyToDirection('ArrowUp')).toBe('up');
      expect(mapKeyToDirection('ArrowDown')).toBe('down');
      expect(mapKeyToDirection('ArrowLeft')).toBe('left');
      expect(mapKeyToDirection('ArrowRight')).toBe('right');
    });

    test('should map WASD keys correctly (lowercase)', () => {
      expect(mapKeyToDirection('w')).toBe('up');
      expect(mapKeyToDirection('s')).toBe('down');
      expect(mapKeyToDirection('a')).toBe('left');
      expect(mapKeyToDirection('d')).toBe('right');
    });

    test('should map WASD keys correctly (uppercase)', () => {
      expect(mapKeyToDirection('W')).toBe('up');
      expect(mapKeyToDirection('S')).toBe('down');
      expect(mapKeyToDirection('A')).toBe('left');
      expect(mapKeyToDirection('D')).toBe('right');
    });

    test('should return null for non-direction keys', () => {
      expect(mapKeyToDirection('Enter')).toBeNull();
      expect(mapKeyToDirection(' ')).toBeNull();
      expect(mapKeyToDirection('x')).toBeNull();
    });
  });

  describe('GRID_SIZE constant', () => {
    test('should be defined', () => {
      expect(GRID_SIZE).toBeDefined();
    });

    test('should be a positive number', () => {
      expect(typeof GRID_SIZE).toBe('number');
      expect(GRID_SIZE).toBeGreaterThan(0);
    });

    test('should be 20 (default grid size)', () => {
      expect(GRID_SIZE).toBe(20);
    });
  });

  describe('Integration tests', () => {
    test('should simulate a complete move without eating food', () => {
      const snake = createInitialSnake();
      const direction = 'right';
      
      const newHead = calculateNewHeadPosition(snake[0], direction);
      const hasWallCollision = checkWallCollision(newHead);
      const hasSelfCollision = checkSelfCollision(newHead, snake);
      
      expect(hasWallCollision).toBe(false);
      expect(hasSelfCollision).toBe(false);
      
      const updatedSnake = updateSnakePosition(snake, newHead, false);
      expect(updatedSnake).toHaveLength(3);
      expect(updatedSnake[0].x).toBe(6);
    });

    test('should simulate eating food and growing', () => {
      const snake = createInitialSnake();
      const food = { x: 6, y: 10 };
      const direction = 'right';
      
      const newHead = calculateNewHeadPosition(snake[0], direction);
      const ateFood = checkFoodCollision(newHead, food);
      
      expect(ateFood).toBe(true);
      
      const updatedSnake = updateSnakePosition(snake, newHead, ateFood);
      expect(updatedSnake).toHaveLength(4);
    });

    test('should detect game over when hitting wall', () => {
      // Snake at the right edge
      const snake = [
        { x: GRID_SIZE - 1, y: 10 },
        { x: GRID_SIZE - 2, y: 10 },
        { x: GRID_SIZE - 3, y: 10 }
      ];
      const direction = 'right';
      
      const newHead = calculateNewHeadPosition(snake[0], direction);
      const hasWallCollision = checkWallCollision(newHead);
      
      expect(hasWallCollision).toBe(true);
    });
  });
});
