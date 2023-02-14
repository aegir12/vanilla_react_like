import Leact from "../lib/Leact.js";

function App() {
  const [state, setState] = Leact.useState(1);

  return Leact.createElement("div", {}, "App");
}

export default App;
