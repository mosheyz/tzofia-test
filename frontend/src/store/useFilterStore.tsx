import { create } from "zustand";
import type { Arena, Priority } from "../types/types";

interface FilterState {
    search: string;
    arenaFilter: string;
    priorityFilter: string;
    setSearch: (search: string) => void;
    setArenaFilter: (arena: Arena) => void;
    setPriorityFilter: (priority: Priority) => void;
}

const useFilterStore = create<FilterState>((set) => ({
    search: "",
    arenaFilter: "*",
    priorityFilter: "*",
    setSearch: (search) => set({ search: search }),
    setArenaFilter: (arena) => set({ arenaFilter: arena }),
    setPriorityFilter: (priority) => set({ priorityFilter: priority }),
}));
export default useFilterStore;
