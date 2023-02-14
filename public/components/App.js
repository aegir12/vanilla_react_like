import Leact from "../lib/Leact.js";

function App() {
  const [state, setState] = Leact.useState(1);

  Leact.useEffect(() => {
    setState(2);
  }, []);

  return Leact.createElement("div", {}, ["App", `${state}`]);
}

export default App;
