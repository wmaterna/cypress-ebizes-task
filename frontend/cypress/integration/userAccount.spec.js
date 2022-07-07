describe('Test user account', () => {
    beforeEach(() => {
       cy.visit("/")
        cy.contains('Zaloguj').click()
        cy.get('input[name=email]').type('adamnowak@gmail.com')
        cy.get('input[name=password]').type('AdamNowak123')
        cy.contains('Sign In').click()
    })
    it('change password not mach', () => {
        cy.contains('Konto użytkownika').click()
        cy.contains('Change password').should('not.be.enabled')
        cy.get('input[name=password]').first().type('123')
        cy.contains('Change password').should('not.be.enabled')
        cy.get('input[name=password]').eq(1).type('12345')
        cy.contains('Change password').should('be.enabled')
        cy.contains('Change password').click()
        cy.get('#notistack-snackbar').should('exist')
        cy.get('#notistack-snackbar').should('have.text', 'Wystąpił błąd, sprawdź czy aktualne hasło jest prawidłowe')
    })

    it('delete account and cancel', () => {
        cy.contains('Konto użytkownika').click()
        cy.get('button[type=submit]').click()
        cy.get('div[role=dialog]').should('exist')
        cy.contains('Anuluj').click()
        cy.get('div[role=dialog]').should('not.exist')
    })

    it('should change paths properly', () => {
        cy.contains('Konto użytkownika').click()
        cy.url().should('include', '/dashboard/user-setup')
        cy.contains('Panel użytkownika').click()
         cy.url().should('include', '/dashboard/animals')
    })

    it('should change password without error', () => {
        cy.contains('Konto użytkownika').click()
        cy.contains('Change password').should('not.be.enabled')
        cy.get('input[name=password]').first().type('AdamNowak123')
        cy.contains('Change password').should('not.be.enabled')
        cy.get('input[name=password]').eq(1).type('AdamNowak123')
        cy.contains('Change password').should('be.enabled')
        cy.contains('Change password').click()
        cy.url().should('include', '/signIn')
    })

})