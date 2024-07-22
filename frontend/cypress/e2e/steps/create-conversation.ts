import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

var userIdG, groupNameG;

Given("o usuário de id {string} está na página da lista de conversas", (userId) => {
  userIdG = userId;
  cy.visit("/user/"+userId+"/conversation");
  cy.wait(500);
});

Given("o grupo de nome {string} não deve estar aparecendo na lista de conversas do usuário", (groupName) => {
  cy.get('[data-cy="conversation-list-name-'+groupName+'"]')
    .should(
      'not.exist'
    );
});

When("o usuário clica em Novo Grupo", () => {
  cy.get('[data-cy="new-group-button"]')
    .click();
});

When("o usuário preenche o nome do grupo com {string}", (groupName: string) => {
  groupNameG = groupName;
  cy.get('[data-cy="group-modal-group-name-input"]')
  .type(groupName);
});

When("o usuário digita {string}", (groupName: string) => {
  cy.get('[data-cy="delete-group-modal-group-name-input"]')
  .type(groupName);
});

When("o usuário seleciona da lista de amigos o usuário de username {string}", (username) => {
  cy.get('[data-cy="friend-list-checkbox-'+username+'"]')
    .click();
});

When("o usuário clica em Criar", (username) => {
  cy.get('[data-cy="craete-group-modal-confirm-button"]')
    .click();
});

// Then("o usuário deve estar na pagina da conversa criada", () => {
//   cy.get('[data-cy="conversation-profile-group-name"]')
//     .should(
//       'have.text',
//       groupNameG
//     );
// });

Then("o grupo de nome {string} deve estar aparecendo na lista de conversas do usuário", (conversationName) => {
  cy.visit("/user/"+userIdG+"/conversation");
  cy.wait(500);
  cy.get('[data-cy="conversation-list-name-'+conversationName+'"]')
    .should(
      'exist'
    );
});


// ==================================================================

Given("a conversa com o usuário de username {string} não deve existir na lista de conversas do usuário", (username) => {
  cy.get('[data-cy="conversation-list-username-'+username+'"]')
    .should(
      'not.exist'
    );
});

When("o usuário clica em Nova Conversa", () => {
  cy.get('[data-cy="new-conversation-button"]')
    .click();
});

When("o usuário clica no usuário de username {string} da lista de amigos", (username) => {
  cy.get('[data-cy="friend-list-button-'+username+'"]')
    .click();
});

Then("a conversa com o usuário de username {string} deve existir na lista de conversas do usuário", (username) => {
  cy.visit("/user/"+userIdG+"/conversation");
  cy.wait(500);
  cy.get('[data-cy="conversation-list-username-'+username+'"]')
    .should(
      'exist'
    );
});