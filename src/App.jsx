import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-inkblack text-black">
      <Outlet />
    </div>
  );
}

export default App;
