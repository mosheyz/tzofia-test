import Register from "../components/Register";
import { useDeleteUser, useGetUsers } from "../hooks/useApiRequests";
import type { User } from "../types/types";

const UsersPage = () => {
    const { data: users, isPending, error, isError } = useGetUsers();
    const { mutate: deleteUser, isPending: deletePending } = useDeleteUser();

    if (isPending) return <div>Loading alerts..</div>;

    return (
        <div>
            <Register />
            {isError && <div>Error: {error.message}</div>}

            {users.map((user: User) => (
                <div className="user-row" key={user.id}>
                    <h3>name: {user.username}</h3>
                    <p>email: {user.email}</p>
                    <p>role: {user.role}</p>
                    <p>assignedArena: {user.assignedArena}</p>
                    <button
                        disabled={deletePending}
                        onClick={() => deleteUser(user.id)}
                    />
                </div>
            ))}
        </div>
    );
};

export default UsersPage;
