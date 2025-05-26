import Grid from "./Grid.js";

document.addEventListener("DOMContentLoaded", () => {
  let GRID_SIZE = 10;
  let CELL_SIZE = 0; // Will be calculated based on canvas size
  let simulationTimer = null;
  let grid = null;

  const percCanvas = document.getElementById("perc-window");
  const ctx = percCanvas.getContext("2d");
  const speedInput = document.getElementById("speed");
  const speedValue = document.getElementById("speed-value");
  const gridSizeInput = document.getElementById("grid-size");
  const percButton = document.getElementById("perc-button");
  const percMessage = document.querySelector(".perc-message");

  // Calculate cell size based on canvas dimensions and grid size
  function calculateCellSize() {
    CELL_SIZE = Math.floor(Math.min(
      percCanvas.width / GRID_SIZE,
      percCanvas.height / GRID_SIZE
    ));
  }

  // Convert linear slider value to logarithmic speed
  function getSpeedFromSlider(value) {
    // Convert 0-100 to 100-1000ms logarithmically
    const minSpeed = 100;
    const maxSpeed = 1000;
    const minLog = Math.log(minSpeed);
    const maxLog = Math.log(maxSpeed);
    const scale = (maxLog - minLog) / 100;
    return Math.round(Math.exp(minLog + scale * value));
  }

  // Update speed display
  speedInput.addEventListener("input", () => {
    const speed = getSpeedFromSlider(speedInput.value);
    speedValue.textContent = speed < 1000 ? `${speed}ms` : `${speed / 1000}s`;
  });

  function showMessage(message, type = "success") {
    percMessage.textContent = message;
    percMessage.className = "perc-message show " + type;
  }

  function clearMessage() {
    percMessage.className = "perc-message";
    percMessage.textContent = "";
  }

  function resetSimulation() {
    // Clear any existing timer
    if (simulationTimer) {
      clearInterval(simulationTimer);
      simulationTimer = null;
    }

    // Clear message
    clearMessage();

    // Clear canvas
    ctx.clearRect(0, 0, percCanvas.width, percCanvas.height);

    // Calculate new cell size
    calculateCellSize();

    // Create new grid instance
    grid = new Grid();
    grid.setGridSide(GRID_SIZE);

    // Draw empty grid
    drawGrid();
  }

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
    if (grid.grid[row][col] === 1) return; // Skip if already open

    ctx.fillStyle = "#4169E1"; // Royal Blue
    ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    // Redraw the grid lines
    ctx.strokeStyle = "black";
    ctx.strokeRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);

    grid.openSite(row, col);

    if (grid.didPercolate()) {
      showMessage(
        "Percolation achieved! Water can now flow from top to bottom."
      );
      if (simulationTimer) {
        clearInterval(simulationTimer);
        simulationTimer = null;
      }
    }
  }

  // Handle clicks on canvas
  percCanvas.addEventListener("click", (event) => {
    const col = Math.floor(event.offsetX / CELL_SIZE);
    const row = Math.floor(event.offsetY / CELL_SIZE);

    // Make sure click is within grid bounds
    if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
      openSite(row, col);
    }
  });

  // Handle percolate button click
  percButton.addEventListener("click", (e) => {
    e.preventDefault();

    // Update grid size from input
    const newSize = parseInt(gridSizeInput.value);
    if (newSize >= 5 && newSize <= 50) {
      GRID_SIZE = newSize;
    }

    resetSimulation();

    const speed = getSpeedFromSlider(speedInput.value);
    showMessage("Simulation started - opening random sites...", "info");
    simulationTimer = setInterval(() => {
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);
      openSite(row, col);
    }, speed);
  });

  // Initial setup
  resetSimulation();
});
