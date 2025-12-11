// startDrag.ts
export let newLeft = 0;
export let newTop = 0;

// shared flag for blocking accidental double-click maximize
export let isDraggingWindow = false;

export default function startDrag(e: React.MouseEvent<HTMLDivElement>) {
  const target = document.getElementById("window");
  if (!target) return;

  const startX = e.clientX;
  const startY = e.clientY;
  const rect = target.getBoundingClientRect();

  const EDGE_MARGIN = 5;
  const nearLeft = Math.abs(e.clientX - rect.left) <= EDGE_MARGIN;
  const nearRight = Math.abs(e.clientX - rect.right) <= EDGE_MARGIN;
  const nearTop = Math.abs(e.clientY - rect.top) <= EDGE_MARGIN;
  const nearBottom = Math.abs(e.clientY - rect.bottom) <= EDGE_MARGIN;

  if (nearLeft || nearRight || nearTop || nearBottom) return;

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  let isDragging = false;
  let framePending = false;
  let mouseX = 0;
  let mouseY = 0;
  let shiftX = 0;
  let shiftY = 0;
  const isMaximized = target.classList.contains("maximized");

  function beginDragging() {
    isDragging = true;
    isDraggingWindow = true; // lock maximize while dragging

    if (isMaximized) {
      const restoreWidth = screenWidth * 0.5;
      const restoreHeight = screenHeight * 0.5;
      const mouseRatioX = startX / screenWidth;
      const newLeftPos = startX - restoreWidth * mouseRatioX;
      const newTopPos = startY - restoreHeight * 0.05;

      target.classList.remove("maximized");
      target.style.width = `${restoreWidth}px`;
      target.style.height = `${restoreHeight}px`;
      target.style.left = `${newLeftPos}px`;
      target.style.top = `${newTopPos}px`;
    }

    const rectNow = target.getBoundingClientRect();
    shiftX = startX - rectNow.left;
    shiftY = startY - rectNow.top;
  }

  function updatePosition() {
    if (!target) return;
    framePending = false;
    newLeft = mouseX - shiftX;
    newTop = mouseY - shiftY;

    if (newLeft < 0) newLeft = 0;
    if (newTop < 0) newTop = 0;

    target.style.left = `${newLeft}px`;
    target.style.top = `${newTop}px`;
  }

  function onMouseMove(ev: MouseEvent) {
    if (!target) return;
    target.style.cursor = "move";

    const dx = Math.abs(ev.clientX - startX);
    const dy = Math.abs(ev.clientY - startY);

    if (!isDragging && (dx > 10 || dy > 10)) {
      beginDragging();
    }

    if (!isDragging) return;

    mouseX = ev.clientX;
    mouseY = ev.clientY;

    if (!framePending) {
      framePending = true;
      requestAnimationFrame(updatePosition);
    }
  }

  function onMouseUp() {
    isDragging = false;
    isDraggingWindow = false; // unlock maximize after drag
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);

  e.preventDefault();
}
