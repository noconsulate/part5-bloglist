import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('shows login page and no blogs when no user logged in', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    
    expect(component.container).toHaveTextContent('login')

    const blogs = component.container.querySelector('.expandable')

    expect(blogs).toBe(null)
  })
})