import React, {useState, useEffect} from 'react'
import service from '../appwrite/config'
import { PostCard, Container, Loader } from '../components'

const AllPost = () => {
    const [posts, setPosts] = useState([])

    useEffect(()=>{}, [])   
        service.getAllPost([]).then((posts)=> {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    
    if (posts.length === 0) {
        return (
            <div className="w-full flex justify-center items-center">
                <Container>
                    <Loader/>
                </Container>
            </div>
        );
    }
   
  return (
    <div className="w-full py-4">
        <Container>
            <div className='flex flex-wrap justify-center gap-4'>
                {
                    posts.map((post)=>(
                        <div key={post.$id}>
                            <PostCard {...post}/>
                        </div>
                    ))
                }
            </div>
        </Container>
    </div>
  )
}

export default AllPost