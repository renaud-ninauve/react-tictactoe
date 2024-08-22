import React from 'react'
import { Board } from './Board'

describe('<Board />', () => {
  it('renders', () => {
    const squares = [
      'X', 'O', 'X',
      'O', 'O', 'X',
      'X', 'X', 'O',
    ];
    
    cy.mount(<Board squares={squares} xIsNext={true}/>);
      cy.get('.square').each((actual, index) => {
        const expected = squares[index] === null ? '' : squares[index];
        cy.get(actual).should('have.text', expected);
      });
  }),

  it('calls onPlay', () => {
    const squares = [
      'X', 'O', 'X',
      'O', 'O', 'X',
      'X', null, null,
    ];
    const onPlaySpy = cy.spy().as("onPlaySpy");
    cy.mount(<Board squares={squares} xIsNext={true} onPlay={onPlaySpy}/>);
    cy.get('.square:last').click();
    cy.get('@onPlaySpy').should('have.been.called');
  }),

  it('shows X is the winner', () => {
    const squares = [
      'X', 'O', 'O',
      'X', 'O', 'X',
      'X', null, null,
    ];
    const onPlaySpy = cy.spy().as("onPlaySpy");
    cy.mount(<Board squares={squares} xIsNext={true} onPlay={onPlaySpy}/>);
    cy.get('.status').should('include.text', 'X').and('include.text', 'Winner');
  }),

  it('don\'t call onPlay when X has won', () => {
    const squares = [
      'X', 'O', 'O',
      'X', 'O', 'X',
      'X', null, null,
    ];
    const onPlaySpy = cy.spy().as("onPlaySpy");
    cy.mount(<Board squares={squares} xIsNext={true} onPlay={onPlaySpy}/>);
    cy.get('.square:last').click();
    cy.get('@onPlaySpy').should('not.have.been.called');
  })
});