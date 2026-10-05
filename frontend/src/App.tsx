import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import { UpdatePage } from "./pages/UpdatePage";
import DeletePage from "./pages/DeletePage";
import MapListPage from "./pages/MapListPage";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create" element={<CreatePage />} />
                    <Route path="/update" element={<UpdatePage />} />
                    <Route path="/delete" element={<DeletePage />} />
                    <Route path="/map-list" element={<MapListPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
