import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "Routes/Home";
import UserEdit from "Routes/UserEdit";

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/customer/:userId" element={<UserEdit />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
