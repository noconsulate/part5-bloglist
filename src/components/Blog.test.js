import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'test title',
  author: 'test author',
  url: 'test url',
  user: 'test user',
  likes: 30
}

const user = {
  username: 'test name'
}

describe('Expanding content', () => {
  let component
  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} />
    )
  })

  test('only name and author of blogs are showed by default', () => {

    const div = component.container.querySelector('.toggleContent')

    expect(div).toHaveStyle('display: none')
  })

  test('blogs expand when clicked', () => {
    const content = component.container.querySelector('.expandable')
    fireEvent.click(content)

    const div = component.container.querySelector('.toggleContent')
    expect(div).not.toHaveStyle('display: none')
  })

})