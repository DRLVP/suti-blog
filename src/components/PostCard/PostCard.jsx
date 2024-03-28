import React from "react";
import service from "../../appwrite/config";
import { Link } from "react-router-dom";

const PostCard = (post) => {
    console.log("this is post in Post Card :::", post);
    return (
        <div className="w-fit px-2 py-1">
            <Link to={`/post/${post.$id}`}>
                <div>
                    <div>
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                        />
                    </div>
                    <h2>{post.title}</h2>
                    <div>
                        {
                            post.content
                        }
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default PostCard;