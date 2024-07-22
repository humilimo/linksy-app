import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

var userIdG,conversationIdG;

Given(
    'estou logado no usuário de username {string} e senha {string}',
    (username: string, password: string) => {
      cy.login(username, password);
    }
  );

Given("o usuário de id {string} está na página da lista de conversas", (userId) => {
    userIdG = userId;
    cy.visit("/user/"+userId+"/conversation");
    cy.wait(500);
  });

Given("a conversa com o usuário de username {string} deve existir na lista de conversas do usuário", (username) => {
cy.get('[data-cy="conversation-list-username-'+username+'"]')
    .should(
    'exist'
    );
});

Given("o grupo de nome {string} deve existir na lista de conversas do usuário", (groupName) => {
    cy.get('[data-cy="conversation-list-name-'+groupName+'"]')
      .should(
        'exist'
      );
  });

When("o usuário clicar na conversa de id {string}", (conversationId) => {
  conversationIdG = conversationId;
  cy.get(`[data-cy="conversation-item-${conversationId}"]`, { timeout: 10000 }).click();
});

Then("o usuário deve ser redirecionado para a página da conversa de id {string}", (conversationId) => {
cy.url().should('include', `/user/${userIdG}/conversation/${conversationIdG}`);
});


// =========================================================================== 

Given("a conversa de id {string} não está favoritada", (conversationId) => {
  cy.get(`[data-cy="conversation-item-${conversationId}"]`)
    .should('exist');
  cy.get(`[data-cy="conversation-favorited-${conversationId}"]`)
    .should('have.class', 'text-gray-400'); 
});

When("o usuário clicar na estrela ao lado da conversa de id {string}", (conversationId) => {
  cy.get(`[data-cy="conversation-item-${conversationId}"]`)
    .should('exist');
  cy.get(`[data-cy="conversation-favorited-${conversationId}"]`)
    .click();
  cy.wait(1000); 
});

Then("a conversa de id {string} deve ser marcada como favorita", (conversationId) => {
  cy.get(`[data-cy="conversation-item-${conversationId}"]`)
    .should('exist');
  cy.get(`[data-cy="conversation-favorited-${conversationId}"]`)
    .should('have.class', 'text-yellow-500'); 
});

// ==================================================================================


Given("a conversa de id {string} está favoritada", (conversationId) => {
  cy.get(`[data-cy="conversation-item-${conversationId}"]`)
    .should('exist');
  cy.get(`[data-cy="conversation-favorited-${conversationId}"]`)
    .should('have.class', 'text-yellow-500'); 
});

Then("a conversa de id {string} não deve está mais marcada como favorita", (conversationId) => {
  cy.get(`[data-cy="conversation-item-${conversationId}"]`)
    .should('exist');
  cy.get(`[data-cy="conversation-favorited-${conversationId}"]`)
    .should('have.class', 'text-gray-400'); 
});