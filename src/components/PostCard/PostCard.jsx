import React from "react";
import service from "../../appwrite/config";
import { Link } from "react-router-dom";
import {ArrowUpRight} from "react-bootstrap-icons";
import parse from "html-react-parser"

const PostCard = ({$id, title, featuredImage, content}) => {
    return (
        <div className="w-fit px-2 py-1 min-w-80 min-h-96 relative">
            <Link to={`/post/${$id}`}>
                <div className="w-[300px] rounded-md border">
                <img
                    src={service.getFilePreview(featuredImage)}
                    className="h-[200px] w-full rounded-t-md object-cover"
                    alt={title}
                />
                <div className="p-4">
                    <h1 className="inline-flex items-center text-lg font-semibold">
                    {title} &nbsp; <ArrowUpRight className="h-4 w-4" />
                    </h1>
                    <p className="mt-3 text-sm text-gray-600">
                        {parse(`${content}`)}
                    </p>
                    
                </div>
                </div>
            </Link>
        </div>
    );
};

export default PostCard;