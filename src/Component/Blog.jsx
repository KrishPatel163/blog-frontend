import React, { useEffect, useState } from "react";
import Card from "./Card";
import Nextbtn from "./Nextbtn";
import BlogForm from "./BlogForm";
import { Link } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext.jsx";
import api from "../Api/axios.js";

const Blog = () => {
    const [pagecards, setPagecards] = useState([]);
    const [pageno, setPageno] = useState(1);
    const { user, setUser } = useAuth();

    const fetchBlogs = async () => {
        const response = await api.get("/api/v1/blogs/show-all");
        setPagecards(response.data.data.allBlogs);
    };

    useEffect(() => {
        fetchBlogs();
    }, []);


    return (
        <div className="min-h-screen bg-black p-6">
            <h1 className="text-bold text-center text-white">
                Hello: {user ? user.username : "Guest"}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-20">
                {pagecards.map((card, index) => (
                    <Card key={index} id={card._id} title={card.title} description={card.description} author={card.author} designation={card.designation} date={card.createdAt} image={card.image}/>
                ))}
            </div>
            {/* <Nextbtn pageno={pageno} setPageno={setPageno} cardslength={cards.length} /> */}
            <br />
            <Link
                className="flex justify-center items-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md "
                to={"/blogform"}
            >
                Add Blog
            </Link>
        </div>
    );
};

export default Blog;
