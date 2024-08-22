describe('My First Test', () => {
  it('Start TicTacToe', () => {
    cy.visit('');
    cy.get('.square')
      .should('have.length', 9);
  }),
  it('Play first move', () => {
    cy.visit('');
    cy.get('.square').should('have.length', 9);
    cy.get('.square:first').click();
    cy.get('.square:first').should('have.text', 'X');
  }) 
})