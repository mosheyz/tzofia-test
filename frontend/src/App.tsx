import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import { UpdatePage } from "./pages/UpdatePage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import UsersPage from "./pages/UsersPage";
import NotFoundPage from "./pages/NotFoundPage";
import Admin from "./components/Admin";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/create" element={<CreatePage />} />
                        <Route path="/update/:id" element={<UpdatePage />} />
                        <Route element={<Admin />}>
                            <Route path="/users" element={<UsersPage />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
