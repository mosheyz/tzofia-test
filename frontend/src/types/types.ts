export type Priority = "Low" | "Medium" | "High" | "Critical" | "*";
export type Status = "Active" | "Handled" | "*";
export type Arena = "North" | "South" | "Center" | "*";

export interface CreateAlert {
    displayName: string;
    description: string;
    priority: Priority;
    status: Status;
    arena: Arena;
    lon: number;
    lat: number;
}

export interface Alert {
    id: string;
    _id: string;
    displayName: string;
    description: string;
    priority: Priority;
    status: Status;
    arena: Arena;
    lon: number;
    lat: number;
    createdAt: string;
}

export interface CreateUser {
    username: string;
    email: string;
    assignedArena: "North" | "South" | "Center" | "All";
    role: "admin" | "general_user" | "arena_user";
    password: string;
}
export interface User {
    id:string;
    username: string;
    email: string;
    assignedArena: "North" | "South" | "Center" | "All";
    role: "admin" | "general_user" | "arena_user";
}