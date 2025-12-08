import { useState } from "react";

export default function Settings() {

    const [notify, setNotify] = useState(true);

    return (
        <div className="p-4 md:p-6">
            <div className="max-w-3xl mx-auto bg-white shadow-sm border rounded-xl p-6">

                <h1 className="text-2xl font-semibold text-gray-800 mb-1">Settings</h1>
                <p className="text-sm text-gray-500 mb-6">Manage account preferences and notifications.</p>

                <div className="space-y-6">

                    <div>
                        <h2 className="text-lg font-medium text-gray-800 mb-2">Notification Preferences</h2>

                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={notify}
                                onChange={() => setNotify(!notify)}
                                className="w-5 h-5"
                            />
                            <span className="text-gray-700 text-sm">Receive booking updates</span>
                        </label>
                    </div>

                    <div className="pt-4 border-t">
                        <h2 className="text-lg font-medium text-gray-800 mb-2">Account</h2>

                        <button className="text-red-600 border border-red-300 px-4 py-2 rounded-lg hover:bg-red-50">
                            Delete Account
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}
