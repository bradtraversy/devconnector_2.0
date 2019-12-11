const baseURL = `http://localhost:3000`

context('Tests for sign up', () => {
    it('Test home page', () => {
        cy.visit(`${baseURL}/`)
        cy.contains('DevConnector')
        cy.contains('Register').click()
        cy.url().should('include', '/register')
        cy.contains('Login').click()
        cy.url().should('include', '/login')
    })

    it('Test signup with blank input', () => {
        cy.visit(`${baseURL}/register`)
        cy.get('input[type="submit"]').click()
        cy.contains(`Name is required`)
        cy.contains(`Please include a valid email`)
        cy.contains(`Please enter a password with 6 or more characters`)
    })

    it('Test signup with blank passwords', () => {
        cy.visit(`${baseURL}/register`)
        cy.get('input[name="name"]').type('Carlos')
        cy.get('input[name="email"]').type("carlos@gmail.com")
        cy.get('input[name="password"]').type("supersecure")
        // cy.get('input[name="password2"]').type("superwrong")
        cy.get('input[type="submit"]').click()
        cy.contains(`Passwords do not match`)
    })

    it('Test signup with nonmatching passwords', () => {
        cy.visit(`${baseURL}/register`)
        cy.get('input[name="name"]').type('Carlos')
        cy.get('input[name="email"]').type("carlos@gmail.com")
        cy.get('input[name="password"]').type("supersecure")
        cy.get('input[name="password2"]').type("superwrong")
        cy.get('input[type="submit"]').click()
        cy.contains(`Passwords do not match`)
    })

    it(`Register with demo user if it doesn't exist already`, () => {
        cy.visit(`${baseURL}/register`)
        cy.get('input[name="name"]').type('Carlos Parks')
        cy.get('input[name="email"]').type("parks@yahoo.com")
        cy.get('input[name="password"]').type("password$1")
        cy.get('input[name="password2"]').type("password$1")
        cy.get('input[type="submit"]').click()

        // only after first demo user created
        cy.contains('User already exists')
    })
})