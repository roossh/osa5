import React from 'react'

const BlogForm = ({ onSubmit, title, author, url, handleAuthorChange, handleTitleChange, handleUrlChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        Title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={handleTitleChange}
        />
        Author:
        <input
          type="text"
          value={author}
          name="Title"
          onChange={handleAuthorChange}
        />
        URL:
        <input
          type="text"
          value={url}
          name="Title"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">tallenna</button>
    </form>
  )
}

export default BlogForm