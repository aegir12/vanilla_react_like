import Main from "./components/Main.js";
import { createComponent, renderDom } from "./lib/components.js";

window.onload = () => {
  // Find the "main" element by its ID
  const mainElement = document.getElementById("main");

  renderDom(mainElement, createComponent(Main));
};
