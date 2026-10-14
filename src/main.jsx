import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import SplashCursor from "./components/SplashCursor.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      //make it protective route
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <>
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
        <RouterProvider router={appRouter} />
      </>
    </ThemeProvider>
  </StrictMode>,
);
