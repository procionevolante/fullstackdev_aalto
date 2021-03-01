const user = {
  username: 'gianni',
  name: 'morandi',
  password: 'giannimorandi',
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  })

  it('Login form is shown', function() {
    cy.contains('username');
    cy.contains('password');
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(user.username);
      cy.get('#password').type(user.password);
      cy.get('#login-button').click();
      cy.contains(`${user.name} logged in`);
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type(user.username);
      cy.get('#password').type(`${user.password}mightBwrong`);
      cy.get('#login-button').click();
      cy.contains('Wrong password?');
    })
  })
})
