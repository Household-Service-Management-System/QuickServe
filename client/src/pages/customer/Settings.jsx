import { useState } from "react";

export default function Settings() {
  // simple, fixed local state (safe)
  const [theme, setTheme] = useState("Light");
  const [language, setLanguage] = useState("English");

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Settings
        </h1>
        <p className="text-sm text-gray-500">
          Manage your preferences
        </p>
      </div>

      {/* ACCOUNT */}
      <Card title="Account">
        <Row label="Email">
          <span className="text-gray-600">user@example.com</span>
        </Row>
        <Row label="Password">
          <button className="text-blue-600 underline">
            Change Password
          </button>
        </Row>
      </Card>

      {/* APPEARANCE */}
      <Card title="Appearance">
        <Row label="Theme">
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="border rounded-lg px-3 py-1"
          >
            <option>Light</option>
            <option>Dark</option>
            <option>System</option>
          </select>
        </Row>

        <Row label="Accent Color">
          <div className="flex gap-2">
            <ColorDot />
            <ColorDot />
            <ColorDot />
            <ColorDot />
          </div>
        </Row>
      </Card>

      {/* NOTIFICATIONS */}
      <Card title="Notifications">
        <Toggle label="Email Notifications" />
        <Toggle label="SMS Notifications" />
        <Toggle label="Push Notifications" />
      </Card>

      {/* PRIVACY */}
      <Card title="Privacy">
        <Toggle label="Public Profile" />
        <Toggle label="Show Booking History" />
      </Card>

      {/* PREFERENCES */}
      <Card title="Preferences">
        <Row label="Language">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded-lg px-3 py-1"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Marathi</option>
          </select>
        </Row>

        <Row label="Time Format">
          <select className="border rounded-lg px-3 py-1">
            <option>12 Hour</option>
            <option>24 Hour</option>
          </select>
        </Row>
      </Card>

      {/* DANGER ZONE */}
      <div className="border border-red-200 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-red-600">
          Danger Zone
        </h2>

        <button className="w-full border rounded-lg px-4 py-2">
          Logout
        </button>

        <button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2">
          Delete Account
        </button>
      </div>
    </div>
  );
}

/* ================= SMALL SAFE COMPONENTS ================= */

function Card({ title, children }) {
  return (
    <div className="bg-white border rounded-xl p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-gray-600">{label}</span>
      {children}
    </div>
  );
}

function Toggle({ label }) {
  const [on, setOn] = useState(true);

  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{label}</span>
      <button
        onClick={() => setOn(!on)}
        className={`w-12 h-6 rounded-full ${
          on ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`block w-5 h-5 bg-white rounded-full transition ${
            on ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

function ColorDot() {
  return (
    <span className="w-6 h-6 rounded-full bg-gray-300 border cursor-pointer" />
  );
}
