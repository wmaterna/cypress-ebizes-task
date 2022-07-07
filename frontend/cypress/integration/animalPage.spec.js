describe('Test animal page with its functionality', () => {
    beforeEach(() => {
        cy.visit("/")
        cy.contains('Zaloguj').click()
        cy.get('input[name=email]').type('adamnowak@gmail.com')
        cy.get('input[name=password]').type('AdamNowak123')
        cy.contains('Sign In').click()
    })
     it('open add animal dialog and cancel', () => {
        cy.contains('Dodaj zwierzę').click()
        cy.get('div[role=dialog]').should('exist')
         cy.contains('ANULUJ').click()
         cy.get('div[role=dialog]').should('not.exist')
    })

    it('should open dialog add new animal', () => {
        cy.contains('Dodaj zwierzę').click()
        cy.get('input[name=name]').type('Burek')
        cy.get('input[name=race]').type('Mieszaniec')
        cy.get('input[name=height]').type('100')
        cy.contains('DODAJ ZWIERZĘ').click()
        cy.get('div[role=dialog]').should('not.exist')
        cy.contains('Burek')
    })

    it('should open delete dialog and cancel operation', () => {
        cy.get('.MuiIconButton-root').first().click()
        cy.get('div[role=dialog]').should('exist')
        cy.contains('Anuluj').click()
        cy.get('div[role=dialog]').should('not.exist')
    })

    it('should delete animal without error', () => {
        cy.get('.MuiIconButton-root').eq(1).click()
        cy.get('div[role=dialog]').should('exist')
        cy.contains('Usuń').click()
        cy.get('div[role=dialog]').should('not.exist')
    })

    it('should open dialog with note', () => {
        cy.contains('Notatka').click()
        cy.get('div[role=dialog]').should('exist')
        cy.get('#mui-4').should('have.text', 'Notatka pozostawiona przez lekarza po spotkaniu')
    })

    it('should change directory properly', () => {
        cy.contains('Zaplanuj wizyty').click()
        cy.url().should('include', '/dashboard/scheduleVisit')
        cy.contains('Plan wizyt').click()
        cy.url().should('include', '/dashboard/visitsPlan')
        cy.contains('Moje zwierzęta').click()
        cy.url().should('include', '/dashboard/animals')
    })
})