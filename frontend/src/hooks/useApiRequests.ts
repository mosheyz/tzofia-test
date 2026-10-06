import type { Alert, CreateAlert } from "../types/types";
import { alertRequests } from "../apiServices/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useGetAlerts = () => {
    return useQuery({
        queryKey: ["alerts"],
        queryFn: alertRequests.get,
    });
};

export const useCreateAlert = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (alert: CreateAlert) => alertRequests.create(alert),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["alerts"] });
            navigate("/");
        },
    });
};
export const useUpdateAlert = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ id, alert }: { id: string; alert: Partial<Alert> }) =>
            alertRequests.update(id, alert),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["alerts"] });
            navigate("/");
        },
    });
};

export const useDeleteAlert = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => alertRequests.delete(id),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["alerts"] }),
    });
};
