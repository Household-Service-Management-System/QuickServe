import { useEffect, useState } from "react";

const COLORS = [
  { name: "Blue", value: "#2563eb" },
  { name: "Indigo", value: "#4f46e5" },
  { name: "Green", value: "#16a34a" },
  { name: "Purple", value: "#7c3aed" },
];

export default function CustomerSettings() {
  const [sidebarColor, setSidebarColor] = useState(
    localStorage.getItem("sidebarColor") || "#2563eb"
  );
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [compact, setCompact] = useState(
    localStorage.getItem("compactSidebar") === "true"
  );
  const [toast, setToast] = useState("");

  /* APPLY SETTINGS */
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-color",
      sidebarColor
    );
    localStorage.setItem("sidebarColor", sidebarColor);

    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);

    localStorage.setItem("compactSidebar", compact);
  }, [sidebarColor, darkMode, compact]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* TOAST */}
      {toast && (
        <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
          {toast}
        </div>
      )}

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Settings
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Personalize your experience
        </p>
      </div>

      {/* APPEARANCE */}
      <div className="bg-white dark:bg-gray-900 border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Appearance</h2>

        <div className="space-y-4">

          {/* Sidebar Color */}
          <div>
            <p className="text-sm font-medium mb-2">Sidebar Color</p>
            <div className="flex gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => {
                    setSidebarColor(c.value);
                    showToast("Sidebar color updated");
                  }}
                  className={`w-9 h-9 rounded-full border-2 transition
                    ${sidebarColor === c.value
                      ? "border-black scale-110"
                      : "border-transparent"
                    }`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Dark Mode</span>
            <button
              onClick={() => {
                setDarkMode(!darkMode);
                showToast("Theme updated");
              }}
              className={`w-12 h-6 rounded-full relative transition
                ${darkMode ? "bg-blue-600" : "bg-gray-300"}`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition
                  ${darkMode ? "right-1" : "left-1"}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* PREFERENCES */}
      <div className="bg-white dark:bg-gray-900 border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Preferences</h2>

        <div className="space-y-4">

          {/* Compact Sidebar */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Compact Sidebar</span>
            <input
              type="checkbox"
              checked={compact}
              onChange={() => {
                setCompact(!compact);
                showToast("Sidebar layout updated");
              }}
              className="w-4 h-4"
            />
          </div>

          {/* Animations */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Reduce Animations</span>
            <input type="checkbox" className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* RESET */}
      <div className="bg-white dark:bg-gray-900 border rounded-xl p-6 flex justify-end">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="text-red-600 hover:underline text-sm"
        >
          Reset to default
        </button>
      </div>
    </div>
  );
}
