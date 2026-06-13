const grid = document.getElementById("grid");
const colorPicker = document.getElementById("colorPicker");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const GRID_SIZE = 32;

let tool = "pen";
let isDrawing = false;
let history = [];
let redoStack = [];
let gridVisible = true;

/* ---------------- CREATE GRID ---------------- */
for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
  const pixel = document.createElement("div");
  pixel.classList.add("pixel");
  pixel.dataset.color = "white";

  pixel.addEventListener("mousedown", () => {
    isDrawing = true;
    handleDraw(pixel);
    saveState();
  });

  pixel.addEventListener("mouseover", () => {
    if (isDrawing) handleDraw(pixel);
  });

  grid.appendChild(pixel);
}

document.addEventListener("mouseup", () => {
  isDrawing = false;
});

/* ---------------- DRAW LOGIC ---------------- */
function handleDraw(pixel) {
  if (tool === "pen") {
    pixel.dataset.color = colorPicker.value;
    pixel.style.backgroundColor = colorPicker.value;
  }

  if (tool === "eraser") {
    pixel.dataset.color = "white";
    pixel.style.backgroundColor = "white";
  }
}

/* ---------------- FLOOD FILL ---------------- */
function floodFill(startPixel, targetColor, newColor) {
  if (targetColor === newColor) return;

  const pixels = document.querySelectorAll(".pixel");

  function getIndex(p) {
    return Array.from(pixels).indexOf(p);
  }

  const queue = [startPixel];

  while (queue.length) {
    const pixel = queue.pop();
    if (!pixel || pixel.dataset.color !== targetColor) continue;

    pixel.dataset.color = newColor;
    pixel.style.backgroundColor = newColor;

    const index = getIndex(pixel);

    const neighbors = [
      pixels[index - 1],
      pixels[index + 1],
      pixels[index - GRID_SIZE],
      pixels[index + GRID_SIZE]
    ];

    neighbors.forEach(n => {
      if (n && n.dataset.color === targetColor) {
        queue.push(n);
      }
    });
  }
}

/* ---------------- TOOL BUTTONS ---------------- */
document.getElementById("penBtn").onclick = () => tool = "pen";
document.getElementById("eraserBtn").onclick = () => tool = "eraser";

document.getElementById("fillBtn").onclick = () => tool = "fill";

grid.addEventListener("click", (e) => {
  if (tool === "fill") {
    const pixel = e.target;
    floodFill(pixel, pixel.dataset.color, colorPicker.value);
    saveState();
  }
});

/* ---------------- CLEAR ---------------- */
document.getElementById("clearBtn").onclick = () => {
  document.querySelectorAll(".pixel").forEach(p => {
    p.dataset.color = "white";
    p.style.backgroundColor = "white";
  });
  saveState();
};

/* ---------------- GRID TOGGLE ---------------- */
document.getElementById("gridToggle").onclick = () => {
  gridVisible = !gridVisible;
  document.querySelectorAll(".pixel").forEach(p => {
    p.style.border = gridVisible ? "1px solid #222" : "none";
  });
};

/* ---------------- UNDO / REDO ---------------- */
function saveState() {
  const state = [...document.querySelectorAll(".pixel")].map(p => p.dataset.color);
  history.push(state);
  redoStack = [];
}

function restore(state) {
  if (!state) return;

  document.querySelectorAll(".pixel").forEach((p, i) => {
    p.dataset.color = state[i];
    p.style.backgroundColor = state[i];
  });
}

document.getElementById("undoBtn").onclick = () => {
  if (history.length === 0) return;

  redoStack.push(history.pop());
  restore(history[history.length - 1]);
};

document.getElementById("redoBtn").onclick = () => {
  if (redoStack.length === 0) return;

  const state = redoStack.pop();
  history.push(state);
  restore(state);
};

/* ---------------- EXPORT PNG ---------------- */
document.getElementById("exportBtn").onclick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const pixels = document.querySelectorAll(".pixel");

  const PIXEL_SIZE = 10;

  /* 1. Draw pixels */
  pixels.forEach((p, i) => {
    const x = i % GRID_SIZE;
    const y = Math.floor(i / GRID_SIZE);

    ctx.fillStyle = p.dataset.color;
    ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
  });

  /* 2. Draw grid lines (IMPORTANT PART) */
  ctx.strokeStyle = "rgba(0,0,0,0.2)";
  ctx.lineWidth = 1;

  for (let i = 0; i <= GRID_SIZE; i++) {
    // vertical lines
    ctx.beginPath();
    ctx.moveTo(i * PIXEL_SIZE, 0);
    ctx.lineTo(i * PIXEL_SIZE, GRID_SIZE * PIXEL_SIZE);
    ctx.stroke();

    // horizontal lines
    ctx.beginPath();
    ctx.moveTo(0, i * PIXEL_SIZE);
    ctx.lineTo(GRID_SIZE * PIXEL_SIZE, i * PIXEL_SIZE);
    ctx.stroke();
  }

  /* 3. Download image */
  const link = document.createElement("a");
  link.download = "pixel-art-with-grid.png";
  link.href = canvas.toDataURL();
  link.click();
};