import { useState } from "react";

export default function CustomerSettings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-3xl mx-auto bg-white border rounded-xl shadow-sm p-6">

        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Settings
        </h1>

        {/* Notifications */}
        <div className="mb-6">
          <h2 className="font-medium text-gray-700 mb-2">
            Notifications
          </h2>

          <div className="flex items-center justify-between mb-3">
            <span>Email Notifications</span>
            <input
              type="checkbox"
              checked={emailNotif}
              onChange={() => setEmailNotif(!emailNotif)}
              className="w-5 h-5"
            />
          </div>

          <div className="flex items-center justify-between">
            <span>SMS Notifications</span>
            <input
              type="checkbox"
              checked={smsNotif}
              onChange={() => setSmsNotif(!smsNotif)}
              className="w-5 h-5"
            />
          </div>
        </div>

        {/* Account */}
        <div className="border-t pt-4">
          <h2 className="font-medium text-gray-700 mb-3">
            Account
          </h2>

          <button className="text-red-600 hover:underline">
            Deactivate Account
          </button>
        </div>

      </div>
    </div>
  );
}
