import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

const Post = () => {
    const [$id, setId] = useState(null);
    const [post, setPost] = useState(null);
    const params = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    console.log("userData in Post page:::", userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        const { id } = params;
        if (id) {
            setId(id);
            service
                .getPost(id)
                .then((post) => {
                    if (post) setPost(post);
                    else navigate("/");
                })
                .catch((error) => {
                    console.error("Error fetching post:", error);
                    navigate("/");
                });
        } else {
            navigate("/");
        }
    }, [params, navigate]);

    const deletePost = () => {
        if ($id) {
            service
                .deletePost($id)
                .then((status) => {
                    if (status) {
                        service.deleteFile(post.featuredImage);
                        navigate("/");
                    }
                })
                .catch((error) => {
                    console.error("Error deleting post:", error);
                });
        }
    };

    return post ? (
        <div className="w-full">
            <Container className="my-5">
                <div>
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                    />

                    {isAuthor && (
                        <div>
                            <Link to={`/edit-post/${$id}`}>
                                <Button>Edit</Button>
                            </Link>
                            <Button onClick={deletePost}>Delete</Button>
                        </div>
                    )}
                </div>
                <div className="w-full">
                    <h1>{post.title}</h1>
                </div>
                <div>{parse(post.content)}</div>
            </Container>
        </div>
    ) : null;
};

export default Post;