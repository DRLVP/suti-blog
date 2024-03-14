import React from 'react'
import service from '../../appwrite/config' //we use here redux
import { Link } from 'react-router-dom'

const PostCard = ({$id, title, featuredImage}) => {
  return (
    <div>
        <Link to={`/posts/${$id}`}>
            <div>
                <div>
                     <img src={service.getFilePreview(featuredImage)} alt={title}/>
                </div>
                <h2>{title}</h2>
            </div>
        </Link>
    </div>
  )
}

export default PostCard