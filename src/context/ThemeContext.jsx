/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import ThemeContext from "./theme-context.js";

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("spender-theme");
    return savedTheme ? savedTheme === "dark" : false;
  });

  useEffect(() => {
    localStorage.setItem("spender-theme", dark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const themeValue = useMemo(() => ({ dark, setDark }), [dark]);

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
}
