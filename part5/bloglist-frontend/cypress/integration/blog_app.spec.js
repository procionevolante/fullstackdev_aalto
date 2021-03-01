const user = {
  username: 'gianni',
  name: 'morandi',
  password: 'giannimorandi',
}
const blog = {
  author: 'Timothy Dexter',
  title: 'A Pickle for the Knowing Ones',
  url: 'https://en.wikipedia.org/wiki/Timothy_Dexter#Writing',
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
    describe.only('succeeds with correct credentials', function() {
      beforeEach(function () {
        cy.get('#username').type(user.username);
        cy.get('#password').type(user.password);
        cy.get('#login-button').click();
        cy.contains(`${user.name} logged in`);
      })

      describe.only('A blog can be created', function() {
        beforeEach(function() {
          cy.contains('new blog').click(); // open the 'new blog' form
          cy.get('input[name=title]').type(blog.title);
          cy.get('input[name=author]').type(blog.author);
          cy.get('input[name=url]').type(blog.url);
          cy.get('input[type=submit][value=save]').click();

          cy.contains('blog added successfully');
          cy.get('.blog-title-author').contains(blog.title);
        })

        it('A blog can be liked', function() {
          cy.get('input[type=button][value=view]').click();
          cy.get('.blog-likes').contains('likes 0');
          cy.get('.btn-like').click();
          cy.get('.blog-likes').contains('likes 1');
        })
      })
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type(user.username);
      cy.get('#password').type(`${user.password}mightBwrong`);
      cy.get('#login-button').click();
      cy.contains('Wrong password?');
    })
  })
})
