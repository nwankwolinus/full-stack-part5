import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { prettyDOM } from '@testing-library/dom'

import Blog from './Blog'

describe('Blog', () => {
  const blog = {
    title: 'Goto considered harmful',
    author: 'Edsger Dijkstra',
    url: 'google.com',
    likes: 1
  }

  const handleLike = jest.fn()
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  const user = JSON.parse(loggedUserJSON)

  beforeEach(() => {
    render(
      <Blog
        initBlog={blog}
        updateBlog={jest.fn()}
        user={user}
        like={handleLike}
      />
    )
  })
  test('renders content', () => {

    const mockHandler = jest.fn()
    const component = render(
      <Blog initBlog={blog} updateBlog={mockHandler} />
    )

    const div = component.container.querySelector('.blog')
    expect(div).toBeDefined()
    console.log(prettyDOM(div))

  })

  test('renders also details when asked to be shown', async () => {

    const button = screen.getByText('View')
    expect(button).toBeDefined()

    fireEvent.click(button)

    const element = screen.getByText(blog.url,{ exact: false })
    screen.getByText(blog.likes, { exact: false })
  })

  test('if liked twice, ', async () => {

    const showButton = screen.getByText('show')
    await user.click(showButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})