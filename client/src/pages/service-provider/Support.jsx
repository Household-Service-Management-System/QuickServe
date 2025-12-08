export default function Support() {
    return (
        <div className="p-4 md:p-6">
            <div className="max-w-3xl mx-auto bg-white shadow-sm border rounded-xl p-6">

                <h1 className="text-2xl font-semibold text-gray-800 mb-1">Help & Support</h1>
                <p className="text-sm text-gray-500 mb-6">Reach out to our team or raise a support request.</p>

                <div className="space-y-5">

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Issue Type</label>
                        <select className="mt-1 w-full border rounded-lg p-2">
                            <option>Booking Issue</option>
                            <option>Payment Issue</option>
                            <option>Verification Issue</option>
                            <option>Technical Issue</option>
                            <option>Others</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Describe your issue</label>
                        <textarea
                            className="mt-1 w-full border rounded-lg p-2"
                            rows={4}
                            placeholder="Explain your issue..."
                        />
                    </div>

                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
                        Submit
                    </button>
                </div>

            </div>
        </div>
    );
}
