import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

interface Props {
    children?: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
    const { user } = useAuthStore();
    const location = useLocation();

    if (!user?.token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
