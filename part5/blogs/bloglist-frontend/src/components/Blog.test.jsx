import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect, vi } from 'vitest'
import Blog from './Blog'
import blogService from '../services/blogs'  // Importa el servicio

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

test('show URL and likes after do click in "view" button', async () => {
  const userOfBlog = {
    name: 'Jane Doe',
    username: 'janedoe'
  }

  const blog = {
    title: 'Testing React Components',
    author: 'John Doe',
    url: 'https://example.com/blog',
    likes: 10,
    user: userOfBlog
  }

  const user = userEvent.setup()
  const mockRemove = vi.fn()

  //Renderiza el componente:
  render(<Blog blog={blog} user={userOfBlog} removeBlog={mockRemove} />)

  //Obtiene la URL y los likes:
  const urlElement = screen.getByText(blog.url)
  const likesElement = screen.getByText(`likes ${blog.likes}`)

  //Verifica que están en el DOM pero ocultos:
  expect(urlElement).not.toBeVisible()
  expect(likesElement).not.toBeVisible()

  //Hace clic en el botón "view":
  const button = screen.getByText('view')
  await user.click(button)

  //Verifica que ahora sí son visibles:
  expect(urlElement).toBeVisible()
  expect(likesElement).toBeVisible()
})

test('clicking the button calls event handler twice', async () => {
  const userOfBlog = {
    name: 'Jane Doe',
    username: 'janedoe'
  }

  const blog = {
    title: 'Testing React Components',
    author: 'John Doe',
    url: 'https://example.com/blog',
    likes: 10,
    user: userOfBlog
  }

  const user = userEvent.setup()
  const mockRemove = vi.fn()

  //Espía la función `addLike` en `blogService`:
  const mockAddLike = vi.spyOn(blogService, 'addLike').mockResolvedValue({
    ...blog,
    likes: blog.likes + 1
  })

  //Renderiza el componente:
  render(<Blog blog={blog} user={userOfBlog} removeBlog={mockRemove} />)

  //Clic en el botón "like" dos veces:
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  //Verifica que `blogService.addLike` se llamó dos veces:
  expect(mockAddLike).toHaveBeenCalledTimes(2)

  //Restaura la función original:
  mockAddLike.mockRestore()
})

