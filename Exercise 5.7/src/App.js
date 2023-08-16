import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=> {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    console.log(user)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage('wrong username or password')
      }, 5000)
    }
  }

  const handleLogout = (event) =>{
    event.preventDefault()
    window.localStorage.clear()
    window.location.reload()
  }
  
  //Allow logged-in user to add new blogs
  const handleCreateBlog = async (newBlog) => {

    console.log('newBlog', newBlog.newBlog)
    try {
      let blog = await blogService.create(newBlog)
      console.log(blog)
      setNotificationMessage(`a new blog ${blog.title} by ${blog.author}`)
      setNotificationType('success');
      // setTimeout(() => {
      //   setNotificationMessage(null)
      // }, 1000);
    } catch (exception) {
      alert('Create, Blog exception')
    }

  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
     <Notification message={notificationMessage}/>
     <Notification message={errorMessage}/>
     <Notification message={notificationType}/>

      <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
      <h3>Create new Blog</h3>

    <Togglable buttonLabel='new note'>
      <CreateForm
        createBlog={handleCreateBlog}>
      </CreateForm>
    </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <p></p>
    </div>
  )
}

export default App;