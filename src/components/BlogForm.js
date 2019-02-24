import React from 'react'

const BlogForm = ({ onSubmit, title, author, url }) => {
  const inputTitle = { value:title.value, type:title.type, onChange:title.onChange }
  const inputAuthor = { value:author.value, type:author.type, onChange:author.onChange }
  const inputUrl = { value:url.value, type:url.type, onChange:url.onChange }

  return (
    <form onSubmit={onSubmit}>
      <div>
        Title:
        <input {...inputTitle} />
        Author:
        <input {...inputAuthor} />
        URL:
        <input {...inputUrl} />
      </div>
      <button type="submit">tallenna</button>
    </form>
  )
}

export default BlogForm