// maximize.ts
import { isDraggingWindow } from "@/utils/window/drag";

export function maximize() {
  if (isDraggingWindow) return; // prevent accidental maximize during drag

  const element = document.getElementById("window");
  console.log("maximize");
  if (!element) return;

  const rect = element.getBoundingClientRect();

  if (element.classList.contains("maximized")) {
    element.classList.remove("maximized");
    element.style.width = element.dataset.prevWidth || "50%";
    element.style.height = element.dataset.prevHeight || "60%";
    element.style.left = element.dataset.prevLeft || "0px";
    element.style.top = element.dataset.prevTop || "0px";
  } else {
    element.dataset.prevWidth = `${rect.width}px`;
    element.dataset.prevHeight = `${rect.height}px`;
    element.dataset.prevLeft = `${rect.left}px`;
    element.dataset.prevTop = `${rect.top}px`;

    element.classList.add("maximized");
    element.style.zIndex = "1000";
    element.style.top = "0";
    element.style.left = "0";
    element.style.width = "100%";
    element.style.height = "100%";
  }
}
