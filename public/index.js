import App from "./components/App.js";
import { renderDom, createElement } from "./lib/Leact.js";

window.onload = () => {
  // Find the "main" element by its ID
  const mainElement = document.getElementById("main");
  renderDom(mainElement, createElement(App));
};
