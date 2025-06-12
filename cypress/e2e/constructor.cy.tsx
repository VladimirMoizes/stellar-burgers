describe('проверяем доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('http://localhost:4000');
  });
});

describe('Интеграционные тесты конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('Добавление булки с типом bun в конструктор', () => {
      cy.fixture('ingredients.json').then((fixture) => {
        const bun = fixture.data.find((item: any) => item.type === 'bun');

        cy.contains(bun.name)
          .parent()
          .within(() => {
            cy.contains('Добавить').click();
          });

        cy.get('[data-testid="constructor-bun-top"]')
          .should('exist')
          .and('contain.text', bun.name);
        cy.get('[data-testid="constructor-bun-bottom"]')
          .should('exist')
          .and('contain.text', bun.name);
      });
    });

    it('Добавление начинки с типом main в конструктор', () => {
      cy.fixture('ingredients.json').then((fixture) => {
        const main = fixture.data.find((item: any) => item.type === 'main');

        cy.contains(main.name)
          .parent()
          .within(() => {
            cy.contains('Добавить').click();
          });

        cy.get('[data-testid="constructor-item"]')
          .should('exist')
          .should('have.length.at.least', 1)
          .and('contain.text', main.name);
      });
    });

    it('Добавление начинки с типом sauce в конструктор', () => {
      cy.fixture('ingredients.json').then((fixture) => {
        const sauce = fixture.data.find((item: any) => item.type === 'sauce');

        cy.contains(sauce.name)
          .parent()
          .within(() => {
            cy.contains('Добавить').click().click();
          });

        cy.get('[data-testid="constructor-item"]')
          .filter(`:contains("${sauce.name}")`)
          .should('have.length', 2); // проверка на двойной клик
      });
    });
  });

  describe('Тесты для открытия и закрытия модального окна', () => {
    it('открытие модального окна ингредиента', () => {
      cy.fixture('ingredients.json').then((fixture) => {
        const ingredient = fixture.data[0];

        cy.contains(ingredient.name).click();

        cy.get('[data-testid="modal"]')
          .should('exist')
          .and('contain.text', ingredient.name);
      });
    });

    it('закрытие модального окна по крестику', () => {
      cy.fixture('ingredients.json').then((fixture) => {
        const ingredient = fixture.data[1];

        cy.contains(ingredient.name).click();

        cy.get('[data-testid="modal"]')
          .should('exist')
          .and('contain.text', ingredient.name);

        cy.get('[data-testid="modal-close"]').should('exist').click();

        cy.get('[data-testid="modal"]').should('not.exist');
      });
    });

    it('Закрытие модального окна по клику на оверлей', () => {
      cy.fixture('ingredients.json').then((fixture) => {
        const ingredient = fixture.data[2];

        cy.contains(ingredient.name).click();

        cy.get('[data-testid="modal"]').should('exist');

        cy.get('[data-testid="modal-overlay"]').click({ force: true });

        cy.get('[data-testid="modal"]').should('not.exist');
      });
    });
  });
});

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '**/api/auth/user', {
      statusCode: 200,
      body: { user: { name: 'Test User', email: 'test@example.com' } }
    }).as('getUser');

    cy.intercept('POST', '**/api/orders', {
      statusCode: 200,
      body: { success: true, order: { number: 12345 } }
    }).as('createOrder');

    // Устанавливаем refreshToken
    window.localStorage.setItem('refreshToken', 'test-refresh-token');

    // Устанавливаем accessToken
    cy.setCookie('accessToken', 'test-access-token');

    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  it('Собирается бургер и создается заказ', () => {
    cy.fixture('ingredients.json').then((fixture) => {
      const bun = fixture.data.find((item: any) => item.type === 'bun');
      const main = fixture.data.find((item: any) => item.type === 'main');
      const sauce = fixture.data.find((item: any) => item.type === 'sauce');

      // Добавляем булку
      cy.contains(bun.name)
        .parent()
        .within(() => cy.contains('Добавить').click());

      // Добавляем начинку main
      cy.contains(main.name)
        .parent()
        .within(() => cy.contains('Добавить').click());

      // Добавляем соус
      cy.contains(sauce.name)
        .parent()
        .within(() => cy.contains('Добавить').click());

      // Проверяем, что ингредиенты добавлены
      cy.get('[data-testid="constructor-bun-top"]').should(
        'contain.text',
        bun.name
      );
      cy.get('[data-testid="constructor-bun-bottom"]').should(
        'contain.text',
        bun.name
      );
      cy.get('[data-testid="constructor-item"]').should(
        'have.length.at.least',
        2
      );

      // Нажимаем кнопку оформить заказ
      cy.get('[data-testid="order-button"]').click();

      // Открываем модалку с номером заказа
      cy.wait('@createOrder');

      cy.get('[data-testid="modal-order-details"]').should('exist');
      cy.get('[data-testid="order-number"]').should('contain.text', '12345');

      // Закрываем модалку
      cy.get('[data-testid="modal-close"]').click();

      cy.get('[data-testid="modal-order-details"]').should('not.exist');

      // Проверяем, что конструктор пуст
      cy.get('[data-testid="constructor-bun-top"]').should('not.exist');
      cy.get('[data-testid="constructor-bun-bottom"]').should('not.exist');
      cy.get('[data-testid="no-ingredients"]').should('exist');
    });
  });
});
