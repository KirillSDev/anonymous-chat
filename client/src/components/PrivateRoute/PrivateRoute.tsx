import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    isAuthenticated: boolean;
    children: React.ReactNode;
    redirectPath: string;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ isAuthenticated, children, redirectPath }) => {
    return <>{isAuthenticated ? children : <Navigate to={redirectPath} />}</>;
};
