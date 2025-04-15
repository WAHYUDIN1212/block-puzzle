
let draggedShape = null;

function createGrid() {
  const grid = document.getElementById("grid");
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.x = x;
      cell.dataset.y = y;
      cell.addEventListener("dragover", e => e.preventDefault());
      cell.addEventListener("drop", e => {
        e.preventDefault();
        if (!draggedShape) return;
        const startX = parseInt(cell.dataset.x);
        const startY = parseInt(cell.dataset.y);
        if (canPlaceShape(draggedShape, startX, startY)) {
          placeShape(draggedShape, startX, startY);
          generateBlocks();
        } else {
          alert("Tidak bisa ditempatkan di sini.");
        }
        draggedShape = null;
      });
      grid.appendChild(cell);
    }
  }
}

function generateBlocks() {
  const container = document.getElementById("blocks");
  container.innerHTML = "";

  const shapes = [
    [[1, 1, 1]],
    [[1], [1], [1]],
    [[1, 1], [1, 1]],
    [[1, 0], [1, 1]],
    [[0, 1], [1, 1]]
  ];

  for (let i = 0; i < 3; i++) {
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const block = document.createElement("div");
    block.className = "block";
    block.draggable = true;
    block.dataset.shape = JSON.stringify(shape);

    block.addEventListener("dragstart", () => {
      draggedShape = JSON.parse(block.dataset.shape);
    });

    shape.forEach(row => {
      const rowDiv = document.createElement("div");
      row.forEach(cell => {
        const div = document.createElement("div");
        div.className = "block-cell";
        if (!cell) div.style.visibility = "hidden";
        rowDiv.appendChild(div);
      });
      block.appendChild(rowDiv);
    });

    container.appendChild(block);
  }
}

function canPlaceShape(shape, startX, startY) {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const gridX = startX + x;
        const gridY = startY + y;
        if (gridX >= 8 || gridY >= 8) return false;
        const cell = document.querySelector(`.cell[data-x='${gridX}'][data-y='${gridY}']`);
        if (!cell || cell.classList.contains("filled")) return false;
      }
    }
  }
  return true;
}

function placeShape(shape, startX, startY) {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const gridX = startX + x;
        const gridY = startY + y;
        const cell = document.querySelector(`.cell[data-x='${gridX}'][data-y='${gridY}']`);
        if (cell) cell.classList.add("filled");
      }
    }
  }
}

createGrid();
generateBlocks();
