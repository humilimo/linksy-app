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

Given('a conversa de id {string} contém as mensagens {string}, {string} , {string} e {string}', (conversationId, msg1, msg2, msg3, msg4) => {
  cy.visit(`/user/${userIdG}/conversation/${conversationId}`);
  cy.wait(500);
  const messages = [msg1, msg2, msg3, msg4];
  messages.forEach((message) => {
    cy.get(`[data-cy="message-${message}"]`).should("exist");
  });
});

When("o usuário pesquisar por {string} na conversa de id {string}", (searchTerm :string, conversationId) => {
  cy.visit(`/user/${userIdG}/conversation/${conversationId}`);
  cy.get('[data-cy="search-input-one-conversation"]').type(searchTerm);
});


Then("o resultado da pesquisa deve incluir as mensagens {string}, {string} e {string}", (msg1, msg2, msg3) => {
  const searchResults = [msg1, msg2, msg3];
  searchResults.forEach((result) => {
    cy.get(`[data-cy="searched-message-${result}"]`).should("exist");
  });
});


// ========================================================== //

Given("o usuário de id {string} está na página da lista de conversas", (userId: string) => {
  userIdG = userId;
  cy.visit(`/user/${userId}/conversation`);
  cy.wait(500);
});

Given('a conversa de id {string} contém as mensagens {string} e {string}', (conversationId, msg1, msg2) => {
  cy.visit(`/user/${userIdG}/conversation/${conversationId}`);
  cy.wait(500);
  const messages = [msg1, msg2];
  messages.forEach((message) => {
    cy.get(`[data-cy="message-${message}"]`).should("exist");
  });
});

When("o usuário pesquisar por {string} em todas as conversas", (searchTerm :string, conversationId) => {
  cy.visit(`/user/${userIdG}/conversation`);
  cy.get('[data-cy="search-input-all-conversation"]').type(searchTerm);
});

Then("o resultado da pesquisa deve incluir as mensagens {string}, {string} , {string} , {string} e {string}", (msg1, msg2, msg3, msg4, msg5) => {
  const searchResults = [msg1, msg2, msg3, msg4, msg5];
  searchResults.forEach((result) => {
    cy.get(`[data-cy="searched-message-all-conversation-${result}"]`).should("exist");
  });
});