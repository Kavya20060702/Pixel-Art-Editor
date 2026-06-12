# 🎨 Pixel Art Editor

A modern browser-based pixel art editor built with HTML, CSS, and JavaScript. Features a 32×32 drawing canvas, multiple drawing tools, PNG export support, and a clean glassmorphism-inspired interface with animated backgrounds.

## ✨ Technologies

* HTML5
* CSS3
* JavaScript (ES6)
* Canvas API
* Local Storage
* CSS Animations

## 🚀 Features

### 🎨 Drawing Tools

* Pen Tool – Draw pixel-perfect artwork
* Eraser Tool – Remove unwanted pixels
* Fill Bucket Tool – Fill connected areas with a selected color

### 🖼 Export & Save

* PNG Export – Download artwork as high-quality PNG images
* Optional Grid Export – Include pixel grid lines in exported images
* Local Storage Support – Save artwork directly in the browser

### ⚡ Editor Features

* 32×32 Pixel Canvas
* Click & Drag Drawing
* Undo / Redo History
* Grid Visibility Toggle
* Color Picker
* Responsive Centered Layout

### ✨ Visual Experience

* Animated Gradient Background
* Glassmorphism-inspired Interface
* Smooth User Interactions
* Modern UI Design

## 📍 The Process

The goal was to create a lightweight pixel art editor that feels intuitive and satisfying to use. The project started as a simple click-to-color grid and gradually evolved into a feature-rich editor with drawing tools, flood fill functionality, undo/redo history management, and PNG exporting.

A major focus was maintaining simplicity while providing features commonly found in professional pixel art software. The export system renders the pixel grid onto a canvas, allowing artwork to be downloaded as crisp PNG images. The modular JavaScript architecture makes it easy to extend with future tools and animation features.

## 🎯 Architecture

### Grid System

* Dynamically generates a 32×32 pixel canvas
* Each pixel stores its own color state
* Efficient DOM-based rendering

### Tool System

* Pen Tool
* Eraser Tool
* Fill Bucket Tool
* Grid Toggle

### State Management

* Undo Stack
* Redo Stack
* Local Storage Persistence

### Export Engine

* Canvas-based rendering
* PNG generation
* Optional grid overlay support

## 🚦 Running the Project

1. Clone the repository

```bash
git clone <repository-url>
```

2. Open the project folder

```bash
cd pixel-art-editor
```

3. Run locally

Simply open:

```bash
index.html
```

Or use VS Code Live Server.

## 🎞️ Preview

Create pixel-perfect artwork directly in your browser, experiment with colors, export creations as PNG files, and build retro-inspired sprites with an intuitive drawing experience.

## 🔮 Future Improvements

* Animation Timeline
* Multi-frame Sprite Editor
* Zoom In / Zoom Out
* Keyboard Shortcuts
* JSON Project Export/Import
* Sprite Sheet Generation
* Custom Canvas Sizes
* Layer Support
