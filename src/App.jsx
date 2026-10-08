import { Outlet } from "react-router-dom";
import "./App.css";
import SplashCursor from "./components/SplashCursor";

function App() {
  return (
    <div className="bg-inkblack text-black">
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={4000}
        COLOR_UPDATE_SPEED={10}
        SHADING
        RAINBOW_MODE={false}
        COLOR="#02c8ff85"
      />
      <Outlet />
    </div>
  );
}

export default App;
