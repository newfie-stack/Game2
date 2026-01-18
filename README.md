# 🐍 Snake Game

A classic Snake game built with HTML5 Canvas, CSS, and vanilla JavaScript. Play directly in your browser!

## 🎮 Play Now

Visit the live game at: https://newfie-stack.github.io/Game2/

## 🕹️ How to Play

- **Desktop**: Use arrow keys (↑ ↓ ← →) or WASD keys to control the snake
- **Mobile**: Use the on-screen directional buttons
- **Pause/Resume**: Press Spacebar or click the Pause button
- **Start/Restart**: Press Enter or click the Start button

## 🎯 Objective

Guide the snake to eat the red food to grow and score points. Avoid hitting the walls or the snake's own body!

## ✨ Features

- Smooth animations and visual effects
- Score tracking with local storage for high scores
- Progressive difficulty (snake speeds up as you score)
- Responsive design for both desktop and mobile
- Touch controls for mobile devices
- Pause functionality

## 🚀 Local Development

Simply open `index.html` in a web browser to play locally.

Alternatively, you can use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (with npx)
npx serve
```

Then open `http://localhost:8000` in your browser.

## 📦 Deployment

This project is configured to automatically deploy to GitHub Pages on push to the `main` branch.

## 🛠️ Technology Stack

- HTML5 Canvas for game rendering
- CSS3 for styling and animations
- Vanilla JavaScript for game logic
- GitHub Actions for CI/CD
- GitHub Pages for hosting