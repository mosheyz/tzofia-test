type Priority = "Low" | "Medium" | "High" | "Critical"
type Status = "Active" | "Handled"
type Arena = "North" | "South" | "Center"

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
}
