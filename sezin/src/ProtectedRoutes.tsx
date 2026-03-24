import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
    children: React.ReactNode;
}

const ProtectedRoutes: React.FC<Props> = ({ children }) => {
    // ✅ token anahtarı sezin_token olarak değiştirildi
    const token = localStorage.getItem('sezin_token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoutes;
