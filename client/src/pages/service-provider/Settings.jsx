import { useEffect, useState } from "react";
import {
    getNotificationPreference,
    updateNotifications
} from "../../api/serviceProviderService";

export default function Settings() {
    const [notify, setNotify] = useState(true);

    useEffect(() => {
        getNotificationPreference()
            .then(res => setNotify(res.data))
            .catch(() => { });
    }, []);

    const toggleNotify = async () => {
        const next = !notify;
        setNotify(next);

        try {
            await updateNotifications(next);
        } catch {
            alert("Failed to update setting");
            setNotify(!next);
        }
    };

    return (
        <div className="p-4 md:p-6">
            <div className="max-w-3xl mx-auto bg-white shadow-sm border rounded-xl p-6">

                <h1 className="text-2xl font-semibold text-gray-800 mb-1">Settings</h1>
                <p className="text-sm text-gray-500 mb-6">
                    Manage account preferences and notifications.
                </p>

                <div>
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                        Notification Preferences
                    </h2>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={notify}
                            onChange={toggleNotify}
                            className="w-5 h-5"
                        />
                        <span className="text-gray-700 text-sm">
                            Receive booking updates
                        </span>
                    </label>
                </div>

            </div>
        </div>
    );
}
