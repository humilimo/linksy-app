import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

var userIdG, conversationIdG;

Given("a conversa de id {string} e de nome {string} está aparecendo na lista de conversas do usuário de id {string}", (conversationId, conversationName, userId) => {
  cy.visit("/user/"+userId+"/conversation");
  cy.wait(500);
  cy.get('[data-cy="conversation-list-id-'+conversationId+'"]')
    .should(
      'exist'
    );
  cy.get('[data-cy="conversation-list-name-'+conversationName+'"]')
    .should(
      'exist'
    );
});

Given("o usuário de id {string} está na página da conversa de id {string}", (userId, conversationId) => {
  userIdG = userId;
  conversationIdG = conversationId;
  cy.visit("/user/"+userId+"/conversation/"+conversationId);
  cy.wait(500);
});

When("o usuário clica no perfil da conversa", () => {
  cy.get('[data-cy="conversation-profile-button"]')
    .click();
});

When("o usuário clica em Deletar Grupo", () => {
  cy.get('[data-cy="conversation-profile-delete-group-button"]')
    .click();
});

When("o usuário digita {string}", (groupName: string) => {
  cy.get('[data-cy="delete-group-modal-group-name-input"]')
  .type(groupName);
});

When("o usuário confirma a deleção do grupo", () => {
  cy.get('[data-cy="delete-group-modal-confirm-button"]')
    .click();
  cy.wait(500);
});

Then("o usuário deve estar na pagina inicial", () => {
  cy.url()
    .should(
      'include',
      "/user/"+userIdG+"/conversation"
    );
});

Then("o usuário deve estar na mesma página", () => {
  cy.url()
    .should(
      'include',
      "/user/"+userIdG+"/conversation/"+conversationIdG
    );
});

Then("o perfil da conversa ainda deve estar aberto", () => {
  cy.get('[data-cy="conversation-profile-menu"]')
    .should(
      'exist'
    );
});

Then("a confirmação de deletar o grupo ainda deve estar na tela", () => {
  cy.get('[data-cy="delete-group-modal"]')
    .should(
      'exist'
    );
});

Then("a mensagem de nome do grupo errado deve estar na tela", () => {
  cy.get('[data-cy="delete-group-modal-wrong-group-name"]')
    .should(
      'exist'
    );
});

Then("o grupo de id {string} e de nome {string} não deve estar aparecendo", (id, name) => {
  cy.get('[data-cy="conversation-list-id-'+id+'"]')
    .should(
      'not.exist'
    );
  cy.get('[data-cy="conversation-list-name-'+name+'"]')
    .should(
      'not.exist'
    );
  
});

Then("o grupo de id {string} e de nome {string} ainda deve estar aparecendo na lista de conversas do usuário", (conversationId, conversationName) => {
  cy.visit("/user/"+userIdG+"/conversation");
  cy.wait(500);
  cy.get('[data-cy="conversation-list-id-'+conversationId+'"]')
    .should(
      'exist'
    );
  cy.get('[data-cy="conversation-list-name-'+conversationName+'"]')
    .should(
      'exist'
    );
});