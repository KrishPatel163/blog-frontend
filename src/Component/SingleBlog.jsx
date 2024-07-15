import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../Api/axios.js";
import DOMPurify from "dompurify";
import toast from "react-hot-toast";
import { useAuth } from "../Auth/AuthContext.jsx";

const SingleBlog = () => {
    const [blog, setBlog] = useState({});
    const navigate = useNavigate();
    const {user} = useAuth();

    const { id } = useParams();
    useEffect(() => {
        const fetchBlogContent = async () => {
            try {
                const response = await api.get(`/api/v1/blogs/${id}`);
                setBlog(response.data.data.blog);
            } catch (error) {
                console.error(
                    "There was an error fetching the blog content!",
                    error
                );
            }
        };
        fetchBlogContent();
    }, [id]);
    const date = new Date(blog.createdAt);

    const handleDelete = async (id) => {
        try {
            const response = await api.delete(`/api/v1/blogs/${id}`);
            toast.success(response.data.message);
            navigate("/");
        } catch (error) {
            console.log("error while deleting", error);
            toast.error(error.response.data.message);
        }
    };

    return (
        // <div>
        //     <img src={blog.image} alt="" />
        //     <p>{blog.category}</p>
        //     <Link to={'/'}>back</Link>

        // </div>

        <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-4 text-sm flex text-gray-400">
                    <span>{date.toLocaleDateString()}</span>
                </div>
                <div className="flex flex-row justify-between items-center">
                <h1 className="text-3xl font-bold text-green-400 mb-2">
                    {blog.title}
                </h1>
                { user && (user.id === blog.owner?._id || user.role === 'admin') && (
                    <button className="px-2 py-1 rounded-md bg-red-600 hover:bg-red-800" onClick={() => handleDelete(blog._id)}>Delete Blog</button>
                ) }
                </div>
                <div className="flex items-center mb-4">
                    <img
                        src="https://via.placeholder.com/40"
                        alt="Author"
                        className="rounded-full mr-2"
                    />
                    <div>
                        <div className="mx-2">
                            <span className="font-medium">{blog.author}</span>
                        </div>
                        <div>
                            <span className="text-gray-400 ml-2 ">
                                {blog.designation}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center mb-4 text-gray-400 text-sm">
                    <span className="mr-4">👁️ 17</span>
                    <span>💬 22</span>
                    <span className="ml-auto">6 min read</span>
                </div>

                <img src={blog.image} alt="Desk" className="rounded-lg" />

                <div
                    className="mb-4"
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                />
                <Link
                    className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-md"
                    to={"/"}
                >
                    back
                </Link>
            </div>
        </div>
    );
};

export default SingleBlog;
