import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

const Post = () => {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    // console.log("userData in Post page:::", userData.userData.$id);
    // console.log("post in Post page:::", post.userId);
    const isAuthor = post && userData ? post.userId === userData.userData.$id : false;
    
    // console.log(isAuthor);
    useEffect(() => {
        
        if (slug) {
            service.getPost(slug).then((post)=>{
                if (post) {
                    setPost(post)
                }else{
                    navigate("/")
                }
            })
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
            service
                .deletePost(post.$id)
                .then((status) => {
                    if (status) {
                        service.deleteFile(post.featuredImage);
                        navigate("/");
                    }
                })
                .catch((error) => {
                    console.error("Error deleting post:", error);
                });
        
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
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button>Edit</Button>
                            </Link>
                            <Button onClick={deletePost}>Delete</Button>
                        </div>
                    )}
                </div>
                <div className="w-full">
                    <h1>{post.title}</h1>
                </div>
                <div>{parse(`${post.content}`)}</div>
            </Container>
        </div>
    ) : null;
};

export default Post;