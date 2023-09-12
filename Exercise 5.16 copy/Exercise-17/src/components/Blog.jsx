/* eslint-disable react/prop-types */
import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ initBlog, updateBlog, user }) => {
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
      <button onClick={() => setDisplayAll(true)} className='view'>View</button>
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

  const remove = async () => {
    if (window.confirm( `Sure you want to remove '${blog.title}' by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id)
      updateBlog()
    }
  }

  const displayBlog = () => (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={() => setDisplayAll(false)}>Hide</button>
      <br></br>
      <div> <a href={blog.url}> {blog.url}</a> </div>
      <br></br>
      <div>{likes}
        <button id='like_but' onClick={handleLike}>like</button>
      </div>
      <br></br>
      <div>{blog.user && blog.user.name}</div>
      <br></br>
      {user && blog.user.username===user.username ?
        <button onClick={remove}>delete</button> : null}
    </div>
  )

  return (
    <div className='blog'>
      {displayAll ?  displayBlog() : displayTitleAndAuthor()}
    </div>
  )
}

export default Blog