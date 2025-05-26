import Grid from "./Grid.js";

document.addEventListener("DOMContentLoaded", () => {
  const grid = new Grid();
  grid.setGridSide(10);

  const percCanvas = document.getElementById("perc-window");
  const ctx = percCanvas.getContext("2d");

  const GRID_SIZE = 10;
  const CELL_SIZE = 20;

  // Set canvas size based on grid
  percCanvas.width = GRID_SIZE * CELL_SIZE;
  percCanvas.height = GRID_SIZE * CELL_SIZE;

  // Draw empty grid
  function drawGrid() {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        ctx.strokeRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }
  }

  // Fill a specific cell
  function openSite(row, col) {
    ctx.fillStyle = "#4169E1"; // Royal Blue
    ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    // Redraw the grid lines
    ctx.strokeStyle = "black";
    ctx.strokeRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    grid.openSite(row, col);
    if (grid.didPercolate()) {
      console.log("Percolated!");
    }
  }

  // Handle clicks
  percCanvas.addEventListener("click", (event) => {
    const col = Math.floor(event.offsetX / CELL_SIZE);
    const row = Math.floor(event.offsetY / CELL_SIZE);

    // Make sure click is within grid bounds
    if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
      openSite(row, col);
    }
  });

  // Initial grid drawing
  drawGrid();
});
