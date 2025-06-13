/// <reference types="cypress" />

import { SELECTORS } from './constants';

Cypress.Commands.add('getIngredientByType', (type) => {
  cy.fixture('ingredients.json').then((fixture) => {
    const ingredient = fixture.data.find((item: any) => item.type === type);
    cy.wrap(ingredient).as(`ingredient_${type}`);
  });
});

Cypress.Commands.add('addIngredientByName', (name) => {
  cy.contains(name)
    .parent()
    .within(() => {
      cy.contains('Добавить').click();
    });
});

Cypress.Commands.add('openIngredientModal', (name) => {
  cy.contains(name).click();
  cy.get(SELECTORS.modal).should('exist').and('contain.text', name);
});

Cypress.Commands.add('closeModalButton', () => {
  cy.get(SELECTORS.modalClose).click();
  cy.get(SELECTORS.modal).should('not.exist');
});

Cypress.Commands.add('closeModalOverlay', () => {
  cy.get(SELECTORS.modalOverlay).click({ force: true });
  cy.get(SELECTORS.modal).should('not.exist');
});

Cypress.Commands.add('setupAppWithIntercepts', () => {
  cy.intercept('GET', '**/api/ingredients', {
    fixture: 'ingredients.json'
  }).as('getIngredients');

  cy.visit('/');
  cy.wait('@getIngredients');
});

Cypress.Commands.add('mockUserAndOrder', () => {
  cy.intercept('GET', '**/api/auth/user', {
    statusCode: 200,
    body: { user: { name: 'Test User', email: 'test@example.com' } }
  }).as('getUser');

  cy.intercept('POST', '**/api/orders', {
    statusCode: 200,
    body: { success: true, order: { number: 12345 } }
  }).as('createOrder');

  window.localStorage.setItem('refreshToken', 'test-refresh-token');
  cy.setCookie('accessToken', 'test-access-token');
});
