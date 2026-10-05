import useFilterStore from "../store/useFilterStore";

const Filter = () => {
    const { priorityFilter, arenaFilter, setArenaFilter, setPriorityFilter } =
        useFilterStore();

    return (
        <div>
            Filter
            <form>
                <select
                    name="priority"
                    id="priority"
                    value={priorityFilter}
                    onChange={(e: any) => setPriorityFilter(e.target.value)}
                >
                    <option value="*">All alerts</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                </select>
                <select
                    name="arena"
                    id="arena"
                    value={arenaFilter}
                    onChange={(e: any) => setArenaFilter(e.target.value)}
                >
                    <option value="*">All alerts</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="Center">Center</option>
                </select>
            </form>
        </div>
    );
};

export default Filter;
