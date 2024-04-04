import React from "react";
import service from "../../appwrite/config";
import { Link } from "react-router-dom";
import {ArrowUpRight} from "react-bootstrap-icons";
import parse from "html-react-parser"

const PostCard = ({$id, title, featuredImage, content}) => {
    return (
        <div className="card w-80 bg-base-100 shadow-xl">
            <Link to={`/post/${$id}`}>
                <figure>
                    <img src={service.getFilePreview(featuredImage)} alt={title} className="h-[200px] w-full rounded-t-md object-cover"/>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {title} <ArrowUpRight className="h-4 w-4" />
                    </h2>
                    <p className="text-ellipsis overflow-hidden line-clamp-2">{parse(`${content}...`)}</p>
                </div>
            </Link>
        </div>
    );
};

export default PostCard;