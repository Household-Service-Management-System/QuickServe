
import { Outlet } from "react-router-dom";
import ServiceProviderSidebar from "../../components/layout/ServiceProviderSidebar";

export default function ServiceProviderLayout() {
    return (
        <div className="flex min-h-screen bg-gray-100">


            <ServiceProviderSidebar />

            <main className="flex-1 p-4 md:p-6 overflow-y-auto">

                <div className="max-w-5xl mx-auto">
                    <Outlet />
                </div>

            </main>
        </div>
    );
}
