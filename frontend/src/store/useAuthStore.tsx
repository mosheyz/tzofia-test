import { create } from "zustand";

interface User {
    id: string;
    email: string;
    username: string;
    assignedArena: "North" | "South" | "Center" | "All";
    role: "admin" | "general_user" | "arena_user";
}

interface UseAuthState {
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
}

const useAuthStore = create<UseAuthState>((set) => ({
    user: null,
    token: localStorage.getItem("token") || null,
    login: (user: User, token: string) => {
        localStorage.setItem("token", token);
        set({ user, token });
    },
    logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null });
    },
}));

export default useAuthStore;
