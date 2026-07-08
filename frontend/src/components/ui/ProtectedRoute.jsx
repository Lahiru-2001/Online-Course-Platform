import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ allowedRoles }) {

    const {
        loading,
        isAuthenticated,
        role,
    } = useAuth();

    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    if (
        allowedRoles &&
        !allowedRoles.includes(role)
    ) {

        switch (role) {

            case "Administrator":
                return (
                    <Navigate
                        to="/admin/dashboard"
                        replace
                    />
                );

            case "Instructor":
                return (
                    <Navigate
                        to="/instructor/dashboard"
                        replace
                    />
                );

            case "Student":
                return (
                    <Navigate
                        to="/student/dashboard"
                        replace
                    />
                );

            default:
                return (
                    <Navigate
                        to="/login"
                        replace
                    />
                );
        }

    }

    return <Outlet />;

}