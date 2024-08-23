import React from 'react'
import { GameInfo } from './GameInfo'

describe('<GameInfo />', () => {
  const GAME_START_INFO = 'Go to game start';

  it('beginning of the game', () => {
    const moves = [0];
    cy.mount(<GameInfo moves={moves}/>);

    cy.get('li')
      .should('have.length', 1);
    
    cy.get('li button').should('have.text', GAME_START_INFO);
  }),

  it('later in the game', () => {
    const moves = [0, 1, 2, 3];
    const currentMove = 2;
    const jumpToSpy = cy.spy().as('jumpToSpy');

    cy.mount(<GameInfo moves={moves} currentMove={currentMove} jumpTo={jumpToSpy} />);

    const expectedInfos = [
      GAME_START_INFO,
      'move 1',
      'You are at move 2',
      'move 3'
    ];

    cy.get('li')
      .should('have.length', expectedInfos.length);

    cy.get('li').each((el, index) => {
      cy.wrap(el)
        .contains(expectedInfos[index])
        .should('exist');
    });

    // buttons for jump to another move
    cy.get('li').each((el, index) => {
      if (index === 2) {
        return;
      }
      cy.wrap(el)
        .find('button')
        .should('exist');
    });

    // no buttons for current move
    cy.get('li')
      .eq(2)
      .find('button')
      .should('not.exist');
      
    // click -> jumpTo
    cy.get('li').eq(1).find('button').click();
    cy.get('@jumpToSpy').should('have.been.calledWith', 1);
  }),

  it('sort', () => {
    const moves = [0, 1, 2, 3];
    const currentMove = 2;

    cy.mount(<GameInfo moves={moves} currentMove={currentMove} />);

    const newestLast = [
      GAME_START_INFO,
      'move 1',
      'You are at move 2',
      'move 3'
    ];

    const infosShouldContains = (expected) => {
      cy.get('li')
       .should('have.length', expected.length);
    
       expected.forEach((expectedText, index) => {
        cy.get('li').eq(index).contains(expectedText).should('exist');
       });
    };

    infosShouldContains(newestLast);
    cy.get('.sort').click();
    infosShouldContains(newestLast.toReversed());
    cy.get('.sort').click();
    infosShouldContains(newestLast);
  })
});