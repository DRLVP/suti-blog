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
    // console.log("userData in Post page:::", userData.$id);
    // console.log("post in Post page:::", post.content.textContent);
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
        <div className="w-full py-8">
            <Container className="my-5">
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button>Edit</Button>
                            </Link>
                            <Button onClick={deletePost} className="ml-2">Delete</Button>
                        </div>
                    )}
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl h-96 object-cover"
                    />

                    
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(`${post.content}`)}
                </div>
            </Container>
        </div>
    ) : null;
};

export default Post;