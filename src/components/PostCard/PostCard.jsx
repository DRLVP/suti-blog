import React from "react";
import service from "../../appwrite/config";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImage }) => {
    return (
        <div className="w-fit px-2 py-1">
            <Link to={`/post/${$id}`}>
                <div>
                    <div>
                        <img
                            src={service.getFilePreview(featuredImage)}
                            alt={title}
                        />
                    </div>
                    <h2>{title}</h2>
                </div>
            </Link>
        </div>
    );
};

export default PostCard;