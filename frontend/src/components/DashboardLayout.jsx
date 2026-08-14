import React, { useState } from "react";
import Dashboard from "../pages/Dashboard";
import AIAssistant from "./AIAssistant";

const DashboardLayout = () => {
    const [openAI, setOpenAI] = useState(false);

    return (
        <div className="relative min-h-screen">

            {/* Dashboard */}
            <Dashboard />

            {/* AI Assistant */}
            {openAI && (
                <AIAssistant />
            )}

            {/* Floating AI Button */}
            <button
                onClick={() => setOpenAI(!openAI)}
                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-2xl text-white shadow-lg transition hover:bg-emerald-700 hover:scale-105"
            >
                {openAI ? "✕" : "🤖"}
            </button>

        </div>
    );
};

// const DashboardLayout = () => {
//     return (
//         <div>
//             <h1 className="fixed top-20 left-10 z-[9999] bg-red-500 p-5 text-white">
//                 DASHBOARD LAYOUT WORKING
//             </h1>

//             <Dashboard />

//             <button className="fixed bottom-8 right-8 z-[9999] h-16 w-16 rounded-full bg-emerald-600 text-3xl text-white">
//                 🤖
//             </button>
//         </div>
//     );
// };

export default DashboardLayout;