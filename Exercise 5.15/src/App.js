import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')



  const [user, setUser] = useState(null)

  const [notificationMessage, setNotificationMessage] = useState(null)
  // const [errorMessage, setErrorMessage] = useState('some error happened...')
  const [notificationType, setNotificationType] = useState('success')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      // blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('Wrong credentials')
      setNotificationType('error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 1000)
    }
  }

  const updateBlog = async () => {
    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs)
  }

  const handleCreateBlog = async (newBlog) => {
    const createdBlog = await blogService.create(newBlog)
    setNotificationMessage(`A new blog '${newBlog.title}' by '${newBlog.author}' added`)
    setBlogs(blogs.concat(createdBlog))
    blogFormRef.current.toggleVisibility()
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    window.location.reload()
  }

  const loginForm = () => (
    <div><h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )

  const createForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <CreateForm
        createBlog={handleCreateBlog}>
      </CreateForm>
    </Togglable>
  )

  const blogList = () => {

    let sortedBlogs = blogs.sort((a, b) => a.likes - b.likes)

    return (
      <div>
        <h2>blogs</h2>
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} initBlog={blog} updateBlog={updateBlog}
            user = {user}
          />
        )}
      </div>
    )
  }

  return (
    <div>
      <Notification message={notificationMessage} type={notificationType} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in <button onClick={handleLogout}>logout</button> </p>
          {createForm()}
          {blogList()}
        </div>
      }
    </div>
  )
}

export default App