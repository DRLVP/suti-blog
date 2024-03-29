import React from "react";
import service from "../../appwrite/config";
import { Link } from "react-router-dom";

const PostCard = ({$id, title, featuredImage}) => {
   
    console.log("PostCard $id::", $id);
    console.log("PostCard title::", title);
    console.log("PostCard featuredimage::", featuredImage);
    return (
        <div className="w-fit px-2 py-1 min-w-80 min-h-96 relative">
            <Link to={`/post/${$id}`}>
                <div>
                    <div>
                        <img
                            src={service.getFilePreview(featuredImage)}
                            alt={title}
                            className="w-full"
                        />
                    </div>
                    <div className="relative p-4 sm:p-6 lg:p-8">
                        <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default PostCard;