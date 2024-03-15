import React, {useEffect, useState} from 'react'
import service from '../appwrite/config'
import { PostCard, Container } from '../components'


const Home = () => {
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        service.getAllPost()
        .then((posts)=>{
            if (posts) {
                setPosts(posts.documents)
            }
        })
    },[])

    if (posts.length === 0 ) {
        return <div className='w-full h-full'>
            <Container>
                <h2 className="text-center text-2xl">Login to read posts</h2>
            </Container>
        </div>
    }
    return (
        <div className='w-full'>
            <Container>
                <div>
                    {
                        posts.map((post)=>{
                            <div key={post.$id}>
                                <PostCard {...post}/>
                            </div>
                        })
                    }
                </div>
            </Container>
        </div>
    )
}

export default Home