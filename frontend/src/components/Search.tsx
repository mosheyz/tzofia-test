import useFilterStore from "../store/useFilterStore";

const Search = () => {
    const { search, setSearch } = useFilterStore();

    return (
        <div>
            Search
            <input
                type="text"
                name="search"
                placeholder="Enter text to search.."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
};

export default Search;
