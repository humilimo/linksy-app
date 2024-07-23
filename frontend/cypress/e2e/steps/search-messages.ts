import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

var userIdG, conversationIdG;

Given(
  'estou logado no usuário de username {string} e senha {string}',
  (username: string, password: string) => {
    cy.login(username, password);
  }
);

Given("o usuário de id {string} está na página da conversa de id {string}", (userId: string, conversationId: string) => {
  userIdG = userId;
  conversationIdG = conversationId;
  cy.visit(`/user/${userId}/conversation/${conversationId}`);
  cy.wait(500);
});

When("o usuário pesquisar por {string} na conversa de id {string}", (searchTerm: string, conversationId: string) => {
  cy.get('[data-cy="search-input"]').type(searchTerm);
  cy.get('[data-cy="search-button"]').click();
});

Then("o resultado da pesquisa deve incluir as mensagens {string}, {string} e {string}", (msg1: string, msg2: string, msg3: string) => {
  cy.get('[data-cy="searched-message"]').should("contain", msg1);
  cy.get('[data-cy="searched-message"]').should("contain", msg2);
  cy.get('[data-cy="searched-message"]').should("contain", msg3);
});