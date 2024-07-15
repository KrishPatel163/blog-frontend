import React, { useState, useCallback } from "react";
import JoditEditor from "jodit-react";
import api from "../Api/axios.js";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const Blogform = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [designation, setDesignation] = useState("");
    const [blogImg, setBlogImg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const config = useCallback(
        {
            readonly: false,
            placeholder: "Start writing...",
            style: {
                backgroundColor: "#ffffff",
                color: "#000000",
            },
            toolbarSticky: false,
            showCharsCounter: false,
            showWordsCounter: false,
            showXPathInStatusbar: false,
        },
        []
    );
    const handleEditorChange = (newContent) => {
        setDescription(newContent);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("author", author);
        formData.append("designation", designation);
        formData.append("blog-img", blogImg);
        setIsLoading(true);
        try {
            const response = await api.post("/api/v1/blogs/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.data.success) {
                toast.success(response.data.message);
                navigate(`/b/${response.data.data.blog._id}`);
            } else {
                toast.error("Failed to create the blog.");
            }
        } catch (error) {
            toast.error("There was an error creating the blog.");
            console.error("There was an error creating the blog!", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <form
                className="w-full max-w-2xl p-8 bg-black rounded-lg shadow-md"
                onSubmit={handleFormSubmit}
                method="POST"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Add Blogs
                </h1>

                <label className="mb-2 text-yellow-400 flex justify-center items-center">
                    Post Title
                </label>
                <input
                    type="text"
                    className="w-full p-2 mb-4 border-2 border-yellow-400 rounded-md bg-black text-white"
                    placeholder="Enter here"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label className="mb-2 text-yellow-400 flex justify-center items-center">
                    Author
                </label>
                <input
                    type="text"
                    className="w-full p-2 mb-4 border-2 border-yellow-400 rounded-md bg-black text-white"
                    placeholder="Enter here"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
                <label className="mb-2 text-yellow-400 flex justify-center items-center">
                    Designation
                </label>
                <input
                    type="text"
                    className="w-full p-2 mb-4 border-2 border-yellow-400 rounded-md bg-black text-white"
                    placeholder="Enter here"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    required
                />

                <label className="mb-2 text-yellow-400 flex justify-center items-center">
                    Post Content
                </label>
                <JoditEditor
                    value={description}
                    config={config}
                    onChange={handleEditorChange}
                />

                <label className="mb-2 text-yellow-400 flex justify-center items-center">
                    Upload Image
                </label>
                <input
                    type="file"
                    className="w-full p-2 mb-4 border-2 border-yellow-400 rounded-md bg-black text-white"
                    onChange={(e) => {
                        setBlogImg(e.target.files[0]);
                    }}
                    required
                />

                <div className="flex justify-center items-center gap-3 ">
                    <button
                        type="submit"
                        className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md ${
                            isLoading ? "cursor-not-allowed opacity-50" : ""
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating Post..." : "Create Post"}
                    </button>
                    <NavLink to="/">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                            Go to home page
                        </button>
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default Blogform;
