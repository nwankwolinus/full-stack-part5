import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ initBlog, updateBlog }) => {
  const [displayAll, setDisplayAll] = useState(false)
  const [likes, setLike] = useState(initBlog.likes)
  const [blog, setBlog] = useState(initBlog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const displayTitleAndAuthor = () => (
    <div style={blogStyle}>
      {blog.title} {blog.author} 
      <button onClick={()=>setDisplayAll(true)}>View</button>
    </div>
  )

  const handleLike = async () => {
    const putBlog = await blogService.update(blog.id, {
      'user': blog.user.id,
      'title': blog.title,
      'author': blog.author,
      'url': blog.url,
      'likes': blog.likes + 1
    })

    setLike(putBlog.likes)
    setBlog(putBlog)
  }

  const displayBlog = () => (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={()=>setDisplayAll(false)}>Hide</button>
      <br></br>
      {blog.url}
      <br></br>
      {likes}
      <button id='like_but' onClick={handleLike}>like</button>
      <br></br>
      {blog.author}
    </div>
  )

  return (
    <div>
      {displayAll ?  displayBlog() : displayTitleAndAuthor()}
    </div>
  )
}
export default Blog