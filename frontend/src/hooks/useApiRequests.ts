import type { Alert, CreateAlert, CreateUser } from "../types/types";
import { alertRequests, usersRequests } from "../apiServices/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export const useGetAlerts = () => {
    const { token } = useAuthStore();
    return useQuery({
        queryKey: ["alerts"],
        queryFn: () => alertRequests.get(token!),
        enabled: !!token
    });
};

export const useCreateAlert = () => {
    const queryClient = useQueryClient();
    const { token } = useAuthStore();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (alert: CreateAlert) => alertRequests.create(token!, alert),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["alerts"] });
            navigate("/");
        },
    });
};

export const useUpdateAlert = () => {
    const queryClient = useQueryClient();
    const { token } = useAuthStore();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ id, alert }: { id: string; alert: Partial<Alert> }) =>
            alertRequests.update(token!, id, alert),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["alerts"] });
            navigate("/");
        },
    });
};

export const useDeleteAlert = () => {
    const { token } = useAuthStore();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => alertRequests.delete(token!, id),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["alerts"] }),
    });
};



export const useGetUsers = () => {
    const { token } = useAuthStore();
    return useQuery({
        queryKey: ["users"],
        queryFn: () => usersRequests.getUsers(token!),
        enabled: !!token,
    });
};

export const useRegister = () => {
    const queryClient = useQueryClient();
    const { token } = useAuthStore();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (user: CreateUser) => usersRequests.register(token!, user),
        onSuccess: () => {
            (queryClient.invalidateQueries({ queryKey: ["users"] }),
                navigate("/admin"));
        },
    });
};

export const useLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuthStore();

    return useMutation({
        mutationFn: (user: { email: string; password: string }) =>
            usersRequests.login(user),
        onSuccess: (data) => {
            console.log(data.user)
            login(data.user, data.token);
            navigate("/");
        },
    });
};
export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    const { token } = useAuthStore();
    return useMutation({
        mutationFn: (id: string) => usersRequests.delete(token!, id),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["users"] }),
    });
};

export const useGetMe = () => {
    const { token } = useAuthStore();
    return useQuery({
        queryKey: ["me"],
        queryFn: () => usersRequests.getMe(token!),
        enabled: !!token,
    });
};
