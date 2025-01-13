import { Navigate, useLocation } from "react-router-dom";

interface Props {
    children?: React.ReactNode;
}

const TempProtectedRoute = ({ children }: Props) => {
    const location = useLocation();
    const tempToken = sessionStorage.getItem("tempAuthToken");

    if (!tempToken) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default TempProtectedRoute;
