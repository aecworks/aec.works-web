// https://docs.cypress.io/api/introduction/api.html

const ROUTES = [
  { text: 'companies', name: 'CompanyList' },
  { text: 'feed', name: 'PostList', label: '( beta )' },
  { text: 'people', name: 'PersonList' },
]

describe('Home', () => {
  beforeEach(() => {
    cy.route2('GET', '/api/community/companies', { fixture: '../fixtures/companies.json' })
    cy.route2('GET', '/api/community/hashtags', { fixture: '../fixtures/hashtags.json' })
    cy.route2('GET', '/api/users/profiles/me', {
      fixture: '../fixtures/profile-me-logged-out.json',
      statusCode: 403,
    })

    cy.visit('/')
  })
  it('Should start on "companies"', () => {
    cy.url().should('include', '/companies')
  })
  describe('Menu Bar', () => {
    it('Menu bar is visible and contains the logo', () => {
      cy.get('[data-cy="nav-container"]')
      cy.get('[data-cy="logo-a"]')
    })
    it(`Menu bar is visible and shows ${ROUTES.length} nav links`, () => {
      cy.get('[data-cy="nav-container"]')
      cy.get('[data-cy="nav-item"]').as('nav-items').should('have.length', ROUTES.length)
      cy.get('@nav-items').each(($el, index) => {
        const txt = $el.text()
        expect(txt).to.include(ROUTES[index].text)
      })
    })
    // TODO: change route?
    // it('You can click on the menu items and go to the respective pages', () => {
    //   for (const route of ROUTES) {
    //     cy.contains(route.text).click()
    //     cy.url().should('include', route.text)
    //   }
    // })
  })
  describe('Login/Logout', () => {
    it('Menu bar contains Login link when logged out', () => {
      cy.get('[data-cy="nav-container"]').contains('login')
    })
  })
  describe('Companies List', () => {
    beforeEach(() => {
      cy.fixture('../fixtures/companies.json').as('companies')
    })
    it('Shows a list of companies', function () {
      cy.get('[data-cy="content"]')
        .get('[data-cy="company-card"]')
        .should('have.length', this.companies.results.length)
    })
    describe('Company card', () => {
      it('Displays all needed information in the company card', function () {
        const company = this.companies.results[0]
        cy.get('[data-cy="content"]')
          .get('[data-cy="company-card"]')
          .first()
          .as('first-card')
          .find('h2')
          .find('a')
          .as('title-link')
          .invoke('text')
          .should((text) => {
            expect(text).to.include(company.name)
          })
        cy.get('@title-link').click().url().should('include', company.slug)
      })
    })
  })
})
