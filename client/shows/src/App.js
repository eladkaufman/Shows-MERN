import "./App.css";
import MainComp from "./Main";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <MainComp />
      </BrowserRouter>
    </div>
  );
}

export default App;
