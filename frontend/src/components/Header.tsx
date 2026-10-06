import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import Filter from "./Filter";
import useAuthStore from "../store/useAuthStore";

const Header = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <header>
            <Link to={"/create"}>Create a new alert</Link>
            <div>
                {user && (
                    <div>
                        <h2>Name: {user.username}</h2>
                        <p>role: {user.role}</p>
                    </div>
                )}
                <Search />
                <Filter />
                <button onClick={handleLogout}>Logout</button>
            </div>
        </header>
    );
};

export default Header;
