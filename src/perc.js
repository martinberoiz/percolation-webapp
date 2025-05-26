document.addEventListener("DOMContentLoaded", () => {
  const percCanvas = document.getElementById("perc-window");
  const ctx = percCanvas.getContext("2d");
  ctx.fillStyle = "green";
  // Add a rectangle at (10, 10) with size 100x100 pixels
  ctx.fillRect(10, 10, 100, 100);
});
