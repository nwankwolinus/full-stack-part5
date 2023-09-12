/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import blogService from '../services/blogs'

const CreateForm  = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [like, setLike] = useState(0)
  const [blog, setBlog] = useState('')

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

  const handleCreateForm = async (event) => {
    event.preventDefault()

    setTitle('')
    setUrl('')
    setAuthor('')

    createBlog({
      'title': title,
      'author': author,
      'url': url,
      'likes': like
    })
  }

  return (
    <form onSubmit={handleCreateForm} className='form'>
      <div>
          title
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div id='author'>
          author
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>

      <div>
          url
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>

      <button type="submit">create</button>
    </form> )

}

export default CreateForm