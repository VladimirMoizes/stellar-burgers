/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getIngredientByType(type: string): Chainable<any>;
    addIngredientByName(name: string): Chainable<Element>;
    openIngredientModal(name: string): Chainable<Element>;
    closeModalButton(): Chainable<Element>;
    closeModalOverlay(): Chainable<Element>;
    setupAppWithIntercepts(): void;
    mockUserAndOrder(): void;
  }
}
