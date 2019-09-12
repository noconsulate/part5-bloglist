import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

const blog = {
  title: 'test title',
  author: 'test author',
  likes: 69
}

test('renders content', () => {

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const titleAndAuthor = component.container.querySelector('.titleAndAuthor')
  expect(titleAndAuthor).toHaveTextContent('test title')
  expect(titleAndAuthor).toHaveTextContent('test author')

  const likes = component.container.querySelector('.likes')
  expect(likes).toHaveTextContent('69')
})

test('clicking like button twice calls event handler twice', () => {
  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})