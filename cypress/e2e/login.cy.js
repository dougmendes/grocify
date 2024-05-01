describe('Login Component', () => {
    beforeEach(() => {
      cy.visit('localhost:3000/login');
    });
  
    it('displays email and password fields', () => {
      cy.get('input[type="email"]').should('exist');
      cy.get('input[type="password"]').should('exist');
    });
  
    it('displays error message when trying to login without email or password', () => {
      cy.get('button').contains('Login').click();
      cy.get('.text-red-500').should('exist');
      cy.contains('Email and password are required.').should('exist');
    });
  });
  