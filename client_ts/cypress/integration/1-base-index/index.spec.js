describe('Renders Index', () => {
  it('Has the correct title', () => {
    cy.visit('/')
    cy.title().should('eq', 'React App')
  })
})
