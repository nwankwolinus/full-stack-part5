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

  describe('Login',function() {
    it('succeeds with correct credentials', {
      defaultCommandTimeout: 10000
    }, function() {
			cy.get('#username').type('Zoro')
			cy.get('#password').type('sword')
			cy.get('#login-button').click()
			cy.contains('Zoro logged-in')
    })

    it('fails with wrong credentials', function() {
			cy.get('#username').type('Zoro')
			cy.get('#password').type('word')
			cy.get('#login-button').click()
			cy.get('.error').contains('Wrong credentials')
    })
	})
})