import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { PostCard, Container, Loader } from "../components";

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        service.getAllPost().then((allposts) => {
            if (allposts) {
                setPosts(allposts.documents);
            }
        })
        .catch((error) => {
            console.error("Error fetching posts:", error);
        });
            
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full h-full">
                <Container>
                    <Loader/>
                    <h2 className="text-center text-2xl m-auto">
                        login to read the posts
                    </h2>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full relative py-8">
            <Container>
                <div className="w-full flex flex-wrap justify-center  gap-4">
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Home;