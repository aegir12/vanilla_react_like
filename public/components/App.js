import Leact from "../lib/Leact.js";

function App() {
  const [state, setState] = Leact.useState(1);

  Leact.useEffect(() => {
    setInterval(() => setState((i) => i + 1), 1000);
  }, []);

  return Leact.createElement("div", {}, ["App", `${state}`]);
}

export default App;
