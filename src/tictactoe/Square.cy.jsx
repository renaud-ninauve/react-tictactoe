import React from 'react'
import Square from './Square'

describe('<Square />', () => {
  it('renders', () => {
    const onClickSpy = cy.spy().as('onClickSpy');
    cy.mount(<Square value="V" onClick={onClickSpy}/>);
    cy.get('.square').click();
    cy.get('@onClickSpy').should('have.been.called');
  })
})