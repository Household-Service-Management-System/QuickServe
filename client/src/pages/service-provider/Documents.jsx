import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Documents() {

    const providerId = 2; // TODO: replace with auth/JWT later

    const [documents, setDocuments] = useState([]);
    const [files, setFiles] = useState({
        ID_PROOF: null,
        ADDRESS_PROOF: null,
        CERTIFICATION: null,
    });

    const [previews, setPreviews] = useState({
        ID_PROOF: null,
        ADDRESS_PROOF: null,
        CERTIFICATION: null,
    });

    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ show: false, type: "", message: "" });

    const certInputRef = useRef(null);

    const showToast = (type, message) => {
        setToast({ show: true, type, message });
        setTimeout(() => setToast({ show: false, type: "", message: "" }), 2500);
    };

    // ---------------- FETCH EXISTING DOCUMENTS ----------------
    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8080/service-provider/${providerId}/documents`
                );
                setDocuments(res.data);
            } catch {
                showToast("error", "Failed to load documents");
            } finally {
                setLoading(false);
            }
        };
        fetchDocs();
    }, [providerId]);

    // ---------------- FILE HANDLER ----------------
    const handleFile = (type, file) => {
        if (!file) return;

        setFiles((p) => ({ ...p, [type]: file }));

        const reader = new FileReader();
        reader.onload = (e) =>
            setPreviews((p) => ({ ...p, [type]: e.target.result }));
        reader.readAsDataURL(file);
    };

    // ---------------- UPLOAD ----------------
    const uploadDocument = async (type) => {
        if (!files[type]) {
            showToast("error", "Please select a file");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("type", type);
            formData.append("file", files[type]);

            await axios.post(
                `http://localhost:8080/service-provider/${providerId}/documents`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            showToast("success", "Document uploaded");
            window.location.reload();
        } catch {
            showToast("error", "Upload failed");
        }
    };

    // ---------------- DELETE ----------------
    const deleteDocument = async (docId) => {
        try {
            await axios.delete(
                `http://localhost:8080/service-provider/documents/${docId}`
            );
            showToast("success", "Document deleted");
            window.location.reload();
        } catch {
            showToast("error", "Delete failed");
        }
    };

    if (loading) {
        return <div className="text-center py-10">Loading documents...</div>;
    }

    const renderExisting = (type) =>
        documents.filter((d) => d.documentType === type);

    return (
        <div className="p-4 md:p-6">
            <div className="max-w-3xl mx-auto bg-white shadow-sm border rounded-xl p-6">

                <h1 className="text-2xl font-semibold text-gray-800 mb-1">
                    Documents & Verification
                </h1>
                <p className="text-sm text-gray-500 mb-6">
                    Upload and manage your verification documents
                </p>

                <div className="space-y-8">

                    {/* ID PROOF */}
                    <section>
                        <h2 className="font-medium mb-2">ID Proof</h2>

                        {renderExisting("ID_PROOF").map((d) => (
                            <div key={d.id} className="flex items-center justify-between mb-2">
                                <a
                                    href={d.documentUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 underline text-sm"
                                >
                                    View uploaded ID proof
                                </a>
                                <span className="text-xs">{d.verificationStatus}</span>
                                <button
                                    onClick={() => deleteDocument(d.id)}
                                    className="text-red-600 text-xs"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}

                        {previews.ID_PROOF && (
                            <img
                                src={previews.ID_PROOF}
                                className="w-32 h-32 object-cover rounded mb-2"
                            />
                        )}

                        <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) =>
                                handleFile("ID_PROOF", e.target.files?.[0])
                            }
                        />

                        <button
                            onClick={() => uploadDocument("ID_PROOF")}
                            className="mt-2 px-4 py-1.5 bg-blue-600 text-white rounded text-sm"
                        >
                            Upload ID Proof
                        </button>
                    </section>

                    {/* ADDRESS PROOF */}
                    <section>
                        <h2 className="font-medium mb-2">Address Proof</h2>

                        {renderExisting("ADDRESS_PROOF").map((d) => (
                            <div key={d.id} className="flex items-center justify-between mb-2">
                                <a
                                    href={d.documentUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 underline text-sm"
                                >
                                    View address proof
                                </a>
                                <span className="text-xs">{d.verificationStatus}</span>
                                <button
                                    onClick={() => deleteDocument(d.id)}
                                    className="text-red-600 text-xs"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}

                        {previews.ADDRESS_PROOF && (
                            <img
                                src={previews.ADDRESS_PROOF}
                                className="w-32 h-32 object-cover rounded mb-2"
                            />
                        )}

                        <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) =>
                                handleFile("ADDRESS_PROOF", e.target.files?.[0])
                            }
                        />

                        <button
                            onClick={() => uploadDocument("ADDRESS_PROOF")}
                            className="mt-2 px-4 py-1.5 bg-blue-600 text-white rounded text-sm"
                        >
                            Upload Address Proof
                        </button>
                    </section>

                    {/* CERTIFICATION */}
                    <section>
                        <h2 className="font-medium mb-2">Certifications (Optional)</h2>

                        {renderExisting("CERTIFICATION").map((d) => (
                            <div key={d.id} className="flex items-center justify-between mb-2">
                                <a
                                    href={d.documentUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 underline text-sm"
                                >
                                    View certification
                                </a>
                                <span className="text-xs">{d.verificationStatus}</span>
                                <button
                                    onClick={() => deleteDocument(d.id)}
                                    className="text-red-600 text-xs"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}

                        {previews.CERTIFICATION && (
                            <img
                                src={previews.CERTIFICATION}
                                className="w-32 h-32 object-cover rounded mb-2"
                            />
                        )}

                        <input
                            ref={certInputRef}
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) =>
                                handleFile("CERTIFICATION", e.target.files?.[0])
                            }
                        />

                        <button
                            onClick={() => uploadDocument("CERTIFICATION")}
                            className="mt-2 px-4 py-1.5 bg-blue-600 text-white rounded text-sm"
                        >
                            Upload Certification
                        </button>
                    </section>

                </div>
            </div>

            {toast.show && (
                <div
                    className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded text-white
            ${toast.type === "success"
                            ? "bg-green-600"
                            : toast.type === "error"
                                ? "bg-red-600"
                                : "bg-blue-600"
                        }`}
                >
                    {toast.message}
                </div>
            )}
        </div>
    );
}
