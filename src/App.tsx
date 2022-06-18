import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainListPage from "./pages/MainListPage";
import MainDetailPage from "./pages/MainDetailPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainListPage />} />
                <Route path="/detail" element={<MainDetailPage />} />
            </Routes>
        </Router>
    );
}

export default App;
