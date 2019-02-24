

/*describe('<App />', () => {
  test('shows login form if logged out', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.container.querySelector('.login')
    )

    expect(component.container).toHaveTextContent('Käyttäjätunnus:')
    expect(component.container).not.toHaveTextContent('blogs')
  })
})

*/
import React from 'react'
import { render, waitForElement } from 'react-testing-library'
import App from './App'
jest.mock('./services/blogs')


describe('<App />', () => {
  it('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Kirjaudu')
    )

    expect(component.container).toHaveTextContent('Kirjaudu')
  })

  it('if user is logged in, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('blogs')
    )
    expect(component.container).toHaveTextContent('Integration Testing')
  })
})