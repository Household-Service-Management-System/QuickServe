export default function Documents() {
    return (
        <div className="p-4 md:p-6">
            <div className="max-w-3xl mx-auto bg-white shadow-sm border rounded-xl p-6">

                <h1 className="text-2xl font-semibold text-gray-800 mb-1">Documents & Verification</h1>
                <p className="text-sm text-gray-500 mb-6">Upload and manage your verification documents.</p>

                <div className="space-y-6">

                    <div>
                        <label className="text-sm font-medium text-gray-700">ID Proof (Aadhar / PAN)</label>
                        <input type="file" className="mt-1 block w-full border rounded-lg p-2" />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Address Proof</label>
                        <input type="file" className="mt-1 block w-full border rounded-lg p-2" />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Certification (Optional)</label>
                        <input type="file" className="mt-1 block w-full border rounded-lg p-2" />
                    </div>

                </div>
            </div>
        </div>
    );
}
