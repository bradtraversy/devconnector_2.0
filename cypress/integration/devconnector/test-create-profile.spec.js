const baseURL = `http://localhost:3000`

const testSkills = `html,css,js`

context('Test successful profile creation', () => {
    beforeEach(() => {
        cy.visit(`${baseURL}/login`)
        cy.get("input[name='email']").type('parks@yahoo.com')
        cy.get("input[name='password']").type('password$1')
        cy.get("input[type='submit']").click()
        cy.url().should('include', '/dashboard')
        cy.contains('Dashboard')
        cy.contains('Create Profile').click()
        cy.contains('Add Social Network Links').click()
    })

    it('Logins user correctly', () => {
        cy.url().should('include', '/create-profile')
        cy.contains('Add Social Network Links').click()
        cy.get("input[type='submit']").click()
        cy.contains(`Status is required`)
        cy.contains(`Skills is required`)
    })

    it('Test blank profile', () => {
        cy.url().should('include', '/create-profile')
        cy.contains('Add Social Network Links').click()
        cy.get("input[type='submit']").click()
        cy.contains(`Status is required`)
        cy.contains(`Skills is required`)
    })
})