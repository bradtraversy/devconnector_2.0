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
    })

    it('Logins user correctly', () => {
        cy.contains('Create Profile').click()
        cy.url().should('include', '/create-profile')
        cy.contains('Add Social Network Links').click()
        cy.get("input[type='submit']").click()
        cy.contains(`Status is required`)
        cy.contains(`Skills is required`)
    })

    it('Test blank profile', () => {
        cy.contains('Create Profile').click()
        cy.url().should('include', '/create-profile')
        cy.contains('Add Social Network Links').click()
        cy.get("input[type='submit']").click()
        cy.contains(`Status is required`)
        cy.contains(`Skills is required`)
    })

    it('Successfully creates new profile', () => {
        cy.contains('Create Profile').click()
        cy.url().should('include', '/create-profile')
        cy.get("select[name='status']").select('Student or Learning')
        cy.get("input[name='company']").type('Axiom')
        cy.get("input[name='website']").type('https://scotch.io/')
        cy.get("input[name='location']").type('Chicago, IL')
        cy.get("input[name='skills']").type('html,clojure,css,       js, python,              docker')
        cy.get("textarea[name='bio']").type('New guy doing automated testing.')

        cy.contains('Add Social Network Links').click()
        // cy.get("div[class='form-group social-input']")
        // cy.get("input[name='youtube']").type('https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA')
        // cy.get("input[type='linkedin']").type('https://ca.linkedin.com/in/wesbos')

        cy.get("input[type='submit']").click()
        cy.url().should('include', '/dashboard')
    })

    it('Successfully adds an experience', () => {
        cy.contains('Add Experience').click()
        cy.url().should('include', '/add-experience')
        cy.get("input[name='title']").type('Full Stack Dev')
        cy.get("input[name='company']").type('Hip Startup')
        cy.get("input[name='location']").type('Boring, OR')
        cy.get("input[name='from']").type('2009-07-02')
        cy.get("input[name='to']").type('2012-08-22')
        cy.get("textarea[name='description']").type('Debugged backend, integrated SSO for frontend, updated documentation.')
        cy.get("input[type='submit']").click()
        cy.url().should('include', '/dashboard')
    })

    it('Successfully adds an education', () => {
        cy.contains('Add Education').click()
        cy.url().should('include', '/add-education')
        cy.get("input[name='school']").type('UCLA')
        cy.get("input[name='degree']").type('BSCS')
        cy.get("input[name='fieldofstudy']").type('Computer Science / Filmography')
        cy.get("input[name='from']").type('2005-09-10')
        cy.get("input[name='to']").type('2009-06-16')
        cy.get("textarea[name='description']").type(`Learned fundamentals of programming and won prize for senior capstone project. Played a lot of Smash Bros in late hours.`)
        cy.get("input[type='submit']").click()
        cy.url().should('include', '/dashboard')
    })
})