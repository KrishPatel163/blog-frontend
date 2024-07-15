import React from 'react';
import { GrFormNextLink } from "react-icons/gr";
import { GoEye } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import DOMPurify from "dompurify";

const Card = ({id, description, title, author, designation, date, image }) => {
    const cleanDescription = DOMPurify.sanitize(description).replace(/(<([^>]+)>)/gi, "");
    const formatDate = new Date(date);
    return (

        <Link to ={'/b/'+id} className="bg-black text-white p-4 rounded-lg shadow-md inline">
            <img src={image} alt={title} className="rounded-md w-full h-50 object-cover" />
            <div className="p-4 ">
                <div className='flex gap-3 '>
                    <div className="text-gray-400 text-xs uppercase mt-1">{formatDate.toLocaleDateString()}</div>
                    <div className="text-gray-400 text-sm mb-3 underline">
                </div>
                </div>
                <h2 className="text-xl font-semibold text-green-500">{title}</h2>
                <p className="mt-2">{cleanDescription.slice(0,80)}</p>
                <div className='flex'>
                    <div>
                        <p className='text-green-500 cursor-pointer'>Read more  </p>
                    </div>
                    <div className='mt-1.5 px-2 text-green-500 cursor-pointer'>
                        < GrFormNextLink />
                    </div>

                </div>
                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center space-x-2">
                        <img src="https://via.placeholder.com/32" alt="Profile" className="w-8 h-8 rounded-full" />
                        <div>
                            <div className="text-sm">{author}</div>
                            <div className="text-xs text-gray-400">{designation}</div>
                        </div>
                    </div>
                    <div className="flex space-x-2 text-gray-400 gap-5">
                        <div className='flex'>
                            <span className='mt-1 mx-1'><GoEye /></span>
                            <span >  17</span>
                        </div>
                        <div className='flex'>
                            <span className='mt-1 mx-1' ><FaRegHeart /></span>
                            <span className=''>22</span>
                        </div>
                    </div>
                </div>
            </div>

        </Link>




    );
};

export default Card;
