import React from "react";
import Blog from "./Component/Blog";
import Registration from "./Component/Registration";
import { Route, Routes } from "react-router-dom";
import Blogform from "./Component/BlogForm";
import SingleBlog from "./Component/SingleBlog";
import Login from "./Component/Login.jsx";
import { AuthProvider } from "./Auth/AuthContext.jsx";

const App = () => {
    return (
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Blog />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/blogform" element={<Blogform />} />
                    <Route path="/b/:id" element={<SingleBlog />} />
                </Routes>
            </AuthProvider>
    );
};

export default App;
