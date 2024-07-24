import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

var userIdG, conversationIdG;

Given(
  "estou logado como o usuário de username {string} e senha {string}",
  (username: string, password: string) => {
    cy.login(username, password);
  }
);

Given(
  "o usuário de id {string} está na página da conversa de id {string}",
  (userId: string, conversationId: string) => {
    userIdG = userId;
    conversationIdG = conversationId;
    cy.visit(`/user/${userId}/conversation/${conversationId}`);
    cy.wait(500);
  }
);

Given("estou na conversa de id {string}", (conversationId) => {
  cy.visit(`/user/${userIdG}/conversation/${conversationId}`);
  cy.wait(500);
});

Then("eu vejo a mensagem {string}", (msg) => {
  cy.get(`[data-cy="message-${msg}"]`).should("exist");
  cy.wait(500);
});

Given(
  "a conversa de id {string} contém a mensagem {string}",
  (conversationId: string, msg: string) => {
    cy.visit(`/user/${userIdG}/conversation/${conversationId}`);
    cy.wait(500);
    cy.get(`[data-cy="message-${msg}"]`).should("exist");
  }
);

When("eu digito a mensagem {string}", (msg: string) => {
  cy.get(`[data-cy="message-input"]`).type(msg);
});

When("clico em Enviar", () => {
  cy.get('[data-cy="send-button"]').click();
});

Then("a mensagem {string} é enviada", (msg: string) => {
  cy.get(`[data-cy="message-${msg}"]`).should("exist");
});