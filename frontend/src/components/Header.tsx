import { Link } from "react-router";
import Search from "./Search";
import Filter from "./Filter";

const Header = () => {
    return (
        <header>
            <Link to={"/create"}>Create a new alert</Link>
            <div>
                <Search />
                <Filter />
            </div>
        </header>
    );
};

export default Header;
