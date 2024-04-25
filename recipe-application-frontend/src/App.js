import logo from "./logo.svg";
import "./App.css";
import Welcome from "./components/Welcome";
import Greeting from "./components/Greeting";

function App() {
  return (
    <div className="App">
      {/* <Welcome name="Kevin" />
      <Welcome name="Estrada" /> */}
      <Greeting name="Kevin Estrada1" />
    </div>
  );
}

export default App;
