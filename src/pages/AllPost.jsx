import React, {useState, useEffect} from 'react'
import service from '../appwrite/config'
import { PostCard, Container } from '../components'

const AllPost = () => {
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        service.getAllPost([]).then((posts)=> {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

   
  return (
    <div className="w-full py-4">
        <Container>
            {
                posts.map((post)=>(
                    <PostCard key={post.$id} post={post} />
                ))
            }
        </Container>
    </div>
  )
}

export default AllPost