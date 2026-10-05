import { Link } from "react-router";
import AddAlert from "./AddAlert";
import Search from "./Search";
import Filter from "./Filter";

const Header = () => {
    return (
        <header>
            <nav>
                <Link to={"/create"}>Create a new alert</Link>
                <Link to={"/update"}>Update an existing alert</Link>
                <Link to={"/delete"}>Delete an existing alert</Link>
                <Link to={"/map-list"}>To see the map-list</Link>
            </nav>
            <div>
              <Search />
              <Filter />
            </div>
        </header>
    );
};

export default Header;
