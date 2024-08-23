describe('My First Test', () => {
  it('Start TicTacToe', () => {
    cy.visit('');
    cy.get('.square')
      .should('have.length', 9);
  }),
  it('Play until win', () => {
    cy.visit('');
    cy.get('.square').should('have.length', 9);
    cy.get('.square').each((el, index) => {
      cy.wrap(el).as("square"+index);
    });

    // XOX
    // XOO
    // X..

    cy.get('@square0').click();
    cy.get('@square0').should('have.text', 'X');

    cy.get('@square1').click();
    cy.get('@square1').should('have.text', 'O');

    cy.get('@square2').click();
    cy.get('@square2').should('have.text', 'X');

    cy.get('@square4').click();
    cy.get('@square4').should('have.text', 'O');

    cy.get('@square3').click();
    cy.get('@square3').should('have.text', 'X');

    cy.get('@square5').click();
    cy.get('@square5').should('have.text', 'O');

    cy.get('@square6').click();
    cy.get('@square6').should('have.text', 'X');

    cy.get('.status')
      .should('include.text', 'Winner')
      .and('include.text', 'X');

    // playing after win does nothing
    cy.get('@square7').click();
    cy.get('@square7').should('have.text', '');
  }) 
});