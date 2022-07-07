describe('Test  register flow', () => {
    beforeEach(() => {
        cy.visit("/")
        cy.contains('Zaloguj').click()
        cy.get('input[name=email]').type('adamnowak@gmail.com')
        cy.get('input[name=password]').type('AdamNowak123')
        cy.contains('Sign In').click()
    })
     it('cancel visit cancel dialog', () => {
        cy.contains('Plan wizyt').click()
        cy.contains('Anuluj wizytę').first().click()
        cy.get('div[role=dialog]').should('exist')
        cy.contains('Zamknij').click()
        cy.get('div[role=dialog]').should('not.exist')

    })

    it('cancel visit and without error', () => {
        cy.contains('Plan wizyt').click()
        cy.contains('Anuluj wizytę').click()
        cy.get('div[role=dialog]').should('exist')
        cy.get('div[role=dialog]').contains('Anuluj wizytę').click()
        cy.get('div[role=dialog]').should('not.exist')
    })




})