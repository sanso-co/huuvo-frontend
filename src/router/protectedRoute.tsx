import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

interface Props {
    children?: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
    const { accessToken, refreshToken } = useAuthStore();
    const location = useLocation();

    if (!accessToken && !refreshToken) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
