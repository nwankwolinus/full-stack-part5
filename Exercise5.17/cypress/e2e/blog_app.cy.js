describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Zoro',
      username: 'Zoro',
      password: 'sword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    // ...
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Zoro',
      username: 'Zoro',
      password: 'sword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
  })
})