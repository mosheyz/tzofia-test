import { useState, type FormEvent } from "react";
import { useRegister } from "../hooks/useApiRequests";

const Register = () => {
    const { mutate: register, isPending, isError, error } = useRegister();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"admin" | "general_user" | "arena_user">(
        "arena_user",
    );
    const [assignedArena, setAssignedArena] = useState<
        "North" | "South" | "Center" | "All"
    >("Center");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        register({ email, password, role, assignedArena, username });
    };

    if (isPending) return <div>Registering...</div>;
    return (
        <div>
            <h2>Wellcome to my website!</h2>
            {isError && <p>Error: {error.message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Your username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Enter a password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <select
                    name="role"
                    id="role"
                    value={role}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setRole(e.target.value)
                    }
                    required
                >
                    <option value="admin">admin</option>
                    <option value="general_user">general_user</option>
                    <option value="arena_user">arena_user</option>
                </select>
                <select
                    name="assignedArena"
                    id="assignedArena"
                    value={assignedArena}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setAssignedArena(e.target.value)
                    }
                    required
                >
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="Center">Center</option>
                    <option value="All">All</option>
                </select>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};
export default Register;
