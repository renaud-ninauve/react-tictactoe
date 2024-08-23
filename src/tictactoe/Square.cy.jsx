import React from 'react'
import Square from './Square'

describe('<Square />', () => {
  it('renders initial', () => {
    const onClickSpy = cy.spy().as('onClickSpy');
    cy.mount(<Square value="V" win={false} onClick={onClickSpy}/>);
    cy.get('.square').should('have.class', 'square');
    cy.get('.square').click();
    cy.get('@onClickSpy').should('have.been.called');
  }),

  it('renders win', () => {
    cy.mount(<Square value="V" win={true}/>);
    cy.get('.square').should('have.class', 'square win');
  })
})