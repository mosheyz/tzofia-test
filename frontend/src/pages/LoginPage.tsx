import React, { useState } from "react";
import { useLogin } from "../hooks/useApiRequests";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { mutate: login, isError, isPending, error } = useLogin();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login({ email, password });
    };

    return (
        <div>
            Login
            {isError && <p>Error: {error.message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                />
                <button type="submit" disabled={isPending}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
