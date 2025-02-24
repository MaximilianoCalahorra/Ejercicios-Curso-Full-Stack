import { render } from '@testing-library/react'
import Blog from './Blog'
import { test, expect } from 'vitest'

test('blog preview', () => {
  const user = {
    username: 'abcdefgh',
    name: 'abcdefgh'
  }

  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 100,
    user
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  const div = container.querySelector('.blog-preview')
  expect(div).toHaveTextContent('title')
  expect(div).toHaveTextContent('author')
  expect(div).not.toHaveTextContent('url')
  expect(div).not.toHaveTextContent('100')
})