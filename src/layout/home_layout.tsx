import { Outlet } from "react-router-dom";

export function HomeLayout() {
    return (
        <div className="min-h-screen">
            {/* <header className="p-6 bg-blue-600 text-white">Home Header</header> */}
            <main><Outlet /></main>
        </div>
    );
}
