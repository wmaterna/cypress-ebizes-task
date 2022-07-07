describe('Test login logout flow', () => {
    beforeEach(() => {
        cy.visit("/")
    })
    it('should login with fail', () => {
        cy.contains('Zaloguj').click()
        cy.url().should('include', '/signIn')
        cy.get('input[name=email]').type('w@m.pl')
        cy.get('input[name=password]').type('1234')
        cy.contains('Sign In').click()
        cy.get('#email-helper-text').should('have.text', 'Nieprawidłowe dane logowania')
    })

     it('should login without error', () => {
        cy.contains('Zaloguj').click()
        cy.url().should('include', '/signIn')
        cy.get('input[name=email]').type('adamnowak@gmail.com')
        cy.get('input[name=password]').type('AdamNowak123')
        cy.contains('Sign In').click()
         cy.url().should('include', '/dashboard/animals')
    })

    it('should logout without error', () => {
        cy.contains('Zaloguj').click()
        cy.url().should('include', '/signIn')
        cy.get('input[name=email]').type('adamnowak@gmail.com')
        cy.get('input[name=password]').type('AdamNowak123')
        cy.contains('Sign In').click()
        cy.url().should('include', '/dashboard/animals')
        cy.contains('Wyloguj').click()
        cy.url().should('include', '/')
    })

     it('should redirect to register page', () => {
        cy.contains('Zaloguj').click()
        cy.url().should('include', '/signIn')
        cy.contains('Nie masz jeszcze konta? Załóż konto').click()
        cy.url().should('include', '/signUp')
    })
})