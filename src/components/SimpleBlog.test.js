import React from 'react'
//import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

//afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Testiblogi',
    author: 'Testiblogisti',
    likes: 0
  }

  const component = render(
    <SimpleBlog blog={blog} onClick={() => console.log('moi')}/>
  )

  expect(component.container).toHaveTextContent(
    'Testiblogi Testiblogisti'
  )

  expect(component.container).toHaveTextContent(
    'blog has 0 likes'
  )
})

test('two button pressed means two calls to eventhandler', () => {
  const blog = {
    title: 'Testiblogi',
    author: 'Testiblogisti',
    likes: 0
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})