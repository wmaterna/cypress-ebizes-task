describe('Test  register flow', () => {
    beforeEach(() => {
        cy.visit("/")
    })
    it('should not login - already exists error', () => {
        cy.contains('Załóż konto').click()
        cy.url().should('include', '/signUp')
        cy.get('input[name=firstName]').type('TestName')
        cy.get('input[name=lastName]').type('TestSurname')
        cy.get('input[name=email]').type('adamnowak@gmail.com')
        cy.get('input[name=password]').type('1234')
        cy.get('input[name=repeatPassword]').type('1234')
        cy.get('button[type=submit]').click()
        cy.contains('Wystąpił błąd serwera, odśwież i spróbuj jeszcze raz.').click()
    })

    it('should not login - password not match', () => {
        cy.contains('Załóż konto').click()
        cy.url().should('include', '/signUp')
        cy.get('input[name=firstName]').type('TestName')
        cy.get('input[name=lastName]').type('TestSurname')
        cy.get('input[name=email]').type('adamnowak@gmail.com')
        cy.get('input[name=password]').type('123')
        cy.get('input[name=repeatPassword]').type('12345')
         cy.get('button[type=submit]').click()
        cy.get('#repeatPassword-helper-text').should('have.text', 'Hasła muszą być identyczne')
    })

    it('should redirect to login page', () => {
        cy.contains('Załóż konto').click()
        cy.url().should('include', '/signUp')
        cy.contains('Masz już konto? Zaloguj się!').click()
        cy.url().should('include', '/signIn')
    })

     it('should register without error', () => {
        cy.contains('Załóż konto').click()
        cy.url().should('include', '/signUp')
        cy.get('input[name=firstName]').type('Weronika')
        cy.get('input[name=lastName]').type('Materna')
        cy.get('input[name=email]').type('test24@gmail.com')
        cy.get('input[name=password]').type('123456')
        cy.get('input[name=repeatPassword]').type('123456')
        cy.get('button[type=submit]').click()
        cy.url().should('include', '/signIn')
    })


})