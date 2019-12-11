const baseURL = `http://localhost:3000`

context('Test login of existing user', () => {
    it('Logins user correctly', () => {
        cy.visit(`${baseURL}/login`)
        cy.get("input[name='email']").type('parks@yahoo.com')
        cy.get("input[name='password']").type('password$1')
        cy.get("input[type='submit']").click()
        cy.url().should('include', '/dashboard')
        cy.contains('Dashboard')
    })
})