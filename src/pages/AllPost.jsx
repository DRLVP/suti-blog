import React, {useState, useEffect} from 'react'
import service from '../appwrite/config'
import { PostCard, Container } from '../components'

const AllPost = () => {
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        service.getAllPost([]).then((posts)=> {
            console.log("get all posts in Allpost page::", posts.documents);
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
                    <div key={post.$id}>
                        <PostCard  post={post} />
                    </div>
                ))
            }
        </Container>
    </div>
  )
}

export default AllPost