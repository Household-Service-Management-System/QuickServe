const Unauthorized = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-red-600">403 – Unauthorized</h1>
            <p className="mt-2 text-gray-600">
                You don’t have permission to access this page.
            </p>
        </div>
    );
};

export default Unauthorized;
