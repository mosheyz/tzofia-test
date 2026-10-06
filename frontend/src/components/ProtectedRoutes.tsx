import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const ProtectedRoutes = () => {
    const { token } = useAuthStore();
    if (token) {
        return <Outlet />;
    }
    return <Navigate to={"/login"} replace/>;
};

export default ProtectedRoutes;
