import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import CreateBlogForm from './CreateBlogForm'

test('calls createBlog with correct details when a new blog is submitted', async () => {
  const mockCreateBlog = vi.fn() //Mock de la función createBlog.
  const mockSetMessage = vi.fn()
  const mockSetTypeMessage = vi.fn()

  const user = userEvent.setup()

  //Renderiza el formulario:
  render(<CreateBlogForm createBlog={mockCreateBlog} setMessage={mockSetMessage} setTypeMessage={mockSetTypeMessage} />)

  //Encuentra los inputs y el botón:
  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const submitButton = screen.getByText('create')

  //Simula la entrada de datos:
  await user.type(titleInput, 'React Testing with Vitest')
  await user.type(authorInput, 'John Doe')
  await user.type(urlInput, 'https://example.com/react-testing')

  //Simula el envío del formulario:
  await user.click(submitButton)

  //Verifica que createBlog fue llamado una vez con los datos correctos:
  expect(mockCreateBlog).toHaveBeenCalledTimes(1)
  expect(mockCreateBlog).toHaveBeenCalledWith({
    title: 'React Testing with Vitest',
    author: 'John Doe',
    url: 'https://example.com/react-testing'
  })
})
