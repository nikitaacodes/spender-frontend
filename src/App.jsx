import { Outlet } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <div className="bg-inkblack text-black">
      {" "}
      <Outlet />
    </div>
  );
}

export default App;
