import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
    )
}

export default AppRoutes;