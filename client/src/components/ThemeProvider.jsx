import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
  const { theme, primaryColor } = useSelector((state) => state.ui);

  useEffect(() => {
    // 🌙 Dark / Light
    document.documentElement.classList.toggle("dark", theme === "dark");

    // 🎨 Primary color (CSS variable)
    document.documentElement.style.setProperty(
      "--primary-color",
      getColor(primaryColor)
    );
  }, [theme, primaryColor]);

  return children;
}

const getColor = (color) => {
  switch (color) {
    case "green":
      return "#16a34a";
    case "purple":
      return "#7c3aed";
    case "orange":
      return "#ea580c";
    default:
      return "#2563eb"; // blue
  }
};
