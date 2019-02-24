import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import Blog from './Blog'

afterEach(cleanup)

test('blog is first rendered in simplified format', () => {
  const blog = {
    title: 'Testiblogi',
    author: 'Testiblogisti',
    url: 'testi.blog',
    likes: 10,
    user: {
      username: 'Testaaja',
      name: 'Testaaja'
    }
  }

  const user = {
    username: 'Testaaja',
    name: 'Testaaja'
  }

  const component = render(
    <Blog
      blog={blog}
      handleLike={() => console.log('moi')}
      handleDelete={() => console.log('moi')}
      user={user}
    />
  )

  expect(component.container).toHaveTextContent(
    'Testiblogi Testiblogisti'
  )

  expect(component.container).not.toHaveTextContent(
    'testi.blog'
  )

  const div = component.container.querySelector('.clickable')

  fireEvent.click(div)

  expect(component.container).toHaveTextContent(
    'testi.blog'
  )
})
