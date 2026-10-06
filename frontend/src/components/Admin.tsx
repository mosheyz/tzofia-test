import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Admin = () => {
    const { user } = useAuthStore();
    if (!user || user.role !== "admin") return <Navigate to={"/"} replace />;
    return <Outlet />;
};

export default Admin;
