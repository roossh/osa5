import React, { useState } from 'react'
const Blog = ({ blog, handleLike, handleDelete, user }) => {

  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const simpleBlog = () => (
    <p>{blog.title} {blog.author}</p>
  )

  const deleteButton = () => (
    <button onClick={() => handleDelete(blog.id)}>poista</button>
  )

  const likeHandler = (event) => {
    console.log(blog)
    handleLike(blog)
    event.stopPropagation()
  }

  const fullBlog = () => (
    <div>
      {blog.title} {blog.author}<br/>
      {blog.url}<br/>
      {blog.likes} likes <button onClick={(event) => likeHandler(event)}>like</button><br/>
      added by {blog.user.name} {user.username === blog.user.username ? deleteButton() : null} <br/>
    </div>
  )
  return(
    <div style={blogStyle}>
      <div onClick={() => setVisible(!visible)}>
        {visible ? fullBlog() : simpleBlog()}
      </div>
    </div>
  )
}

export default Blog