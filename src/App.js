import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState({
    message: null
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  })

  const notify = (message, type='notification') => {
    setNotification({message, type})
    setTimeout(() => setNotification({message:null}), 5000)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
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
      notify(`Käyttäjätunnus tai salasana virheellinen!`, 'error')
    }

  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    notify(`Kirjauduttu ulos!`, 'notification')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const blogObject = await blogService.create({
        title, author, url, user,
      })
      setBlogs(blogs.concat(blogObject))
      notify(`Uusi blogi ${title} lisätty`, 'notification')
      setTitle('')
      setAuthor('')
      setUrl('')

    } catch (exception) {
      notify(`Virhe blogin lisäyksessä!`, 'error')
    }
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }
  
  const handleLike = (blog) => {
    const blogObject = {
      id: blog.id,
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    blogService
      .update(blogObject).then(returnedBlog => {
        setBlogs(blogs.map(b => b.id !== blogObject.id ? b : returnedBlog))
      })
  }

  const deleteBlog = (id) => {
    const blog = blogs.find(b => b.id === id)
    const ok = window.confirm(`Poistetaanko blogi ${blog.title}?`)
    if (ok) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== id))
        })
      notify(`Poistettiin blogi ${blog.title} ${blog.author}`)
    }
  }

  const loginForm = () => (
    <LoginForm
      handleLogin={handleLogin}
      handleUsernameChange={handleUsernameChange}
      handlePasswordChange={handlePasswordChange}
      username={username}
      password={password}
    />
  )

  const blogsList = (username) => (
    <div>
      {username} kirjautunut sisään
      <button onClick={handleLogout}>kirjaudu ulos</button>
      <h2>create new</h2>
      {blogForm()}
      <BlogList blogs={blogs} handleLike={handleLike} handleDelete={deleteBlog} user={user}/>
    </div>
  )

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        onSubmit = {handleSubmit}
        title = {title}
        author = {author}
        url = {url}
        handleAuthorChange = {handleAuthorChange}
        handleTitleChange = {handleTitleChange}
        handleUrlChange = {handleUrlChange}
      />
    </Togglable>
  )

  return (
    <div>
      <Notification notification={notification} />
      {user === null ? loginForm() : blogsList(user.name)}
    </div>
  )
}

export default App