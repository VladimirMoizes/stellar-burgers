import { SELECTORS } from '../support/constants';

describe('проверяем доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('/');
  });
});

describe('Интеграционные тесты конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.mockUserAndOrder();

    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  describe('Добавление ингредиентов', () => {
    it('добавляет булку', () => {
      cy.getIngredientByType('bun');
      cy.get('@ingredient_bun').then((bun: any) => {
        cy.addIngredientByName(bun.name);

        cy.get(SELECTORS.bunTop).should('contain.text', bun.name);
        cy.get(SELECTORS.bunBottom).should('contain.text', bun.name);
      });
    });

    it('добавляет начинку', () => {
      cy.getIngredientByType('main');
      cy.get('@ingredient_main').then((main: any) => {
        cy.addIngredientByName(main.name);

        cy.get(SELECTORS.item)
          .should('have.length.at.least', 1)
          .and('contain.text', main.name);
      });
    });

    it('добавляет соус', () => {
      cy.getIngredientByType('sauce');
      cy.get('@ingredient_sauce').then((sauce: any) => {
        cy.contains(sauce.name)
          .parent()
          .within(() => {
            cy.contains('Добавить').click().click(); // двойной клик
          });

        cy.get(SELECTORS.item)
          .filter(`:contains("${sauce.name}")`)
          .should('have.length', 2);
      });
    });
  });

  describe('Модальные окна', () => {
    it('открывает модалку ингредиента', () => {
      cy.getIngredientByType('bun');
      cy.get('@ingredient_bun').then((bun: any) => {
        cy.openIngredientModal(bun.name);
      });
    });

    it('закрывает модалку по кнопке', () => {
      cy.getIngredientByType('main');
      cy.get('@ingredient_main').then((main: any) => {
        cy.openIngredientModal(main.name);
        cy.closeModalButton();
      });
    });

    it('закрывает модалку по клику на оверлей', () => {
      cy.getIngredientByType('sauce');
      cy.get('@ingredient_sauce').then((sauce: any) => {
        cy.openIngredientModal(sauce.name);
        cy.closeModalOverlay();
      });
    });
  });
});

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.setupAppWithIntercepts();
    cy.mockUserAndOrder();
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  it('собирает бургер и создаёт заказ', () => {
    cy.getIngredientByType('bun');
    cy.getIngredientByType('main');
    cy.getIngredientByType('sauce');

    cy.get('@ingredient_bun').then((bun: any) => {
      cy.addIngredientByName(bun.name);
    });

    cy.get('@ingredient_main').then((main: any) => {
      cy.addIngredientByName(main.name);
    });

    cy.get('@ingredient_sauce').then((sauce: any) => {
      cy.addIngredientByName(sauce.name);
    });

    cy.get(SELECTORS.orderButton).click();
    cy.wait('@createOrder');

    cy.get(SELECTORS.modalOrderDetails).should('exist');
    cy.get(SELECTORS.orderNumber).should('contain.text', '12345');

    cy.get(SELECTORS.modalClose).click();
    cy.get(SELECTORS.modalOrderDetails).should('not.exist');

    cy.get(SELECTORS.bunTop).should('not.exist');
    cy.get(SELECTORS.bunBottom).should('not.exist');
    cy.get(SELECTORS.noIngredients).should('exist');
  });
});
