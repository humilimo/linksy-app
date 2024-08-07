import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

var userIdG, groupNameG, qtyG;

Given("o usuário está logado com o usuário de id {string}, username {string} e senha {string}", (userId, userUsername: string, userPassword: string) => {
  userIdG = userId;
  cy.login(userUsername, userPassword);
  cy.wait(500);
});

Given("o usuário está na página da lista de conversas", () => {
  cy.visit("/user/"+userIdG+"/conversation");
  cy.wait(500);
});

Given("existem {string} grupos de nome {string} aparecendo na lista de conversas do usuário", (qty, groupName) => {
  cy.get('body').then((body) => {
    if (body.find(`[data-cy="conversation-list-name-${groupName}"]`).length === 0) {
      expect(0).to.equal(+qty);
    } else {
      cy.get(`[data-cy="conversation-list-name-${groupName}"]`).should('have.length', +qty);
    }
  });
});


When("o usuário clica em Nova Conversa", () => {
  cy.get('[data-cy="new-conversation-button"]')
    .click();
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

When("o usuário seleciona da lista de amigos o usuário de username {string}", (username) => {
  cy.get('[data-cy="friend-list-checkbox-'+username+'"]')
    .click();
});

When("o usuário clica em Criar", () => {
  cy.get('[data-cy="craete-group-modal-confirm-button"]')
    .click();
});

Then("o usuário deve estar na pagina da conversa criada de id {string}", (id) => {
  cy.url().should(
    'include',
    "/user/"+userIdG+"/conversation/"+id
  );
});

Then("devem existir {string} grupos de nome {string} na lista de conversas do usuário", (qty, conversationName) => {
  cy.visit("/user/"+userIdG+"/conversation");
  cy.wait(500);

  cy.get('body').then((body) => {
    if (body.find(`[data-cy="conversation-list-name-${conversationName}"]`).length === 0) {
      expect(0).to.equal(+qty);
    } else {
      cy.get(`[data-cy="conversation-list-name-${conversationName}"]`).should('have.length', +qty);
    }
  });
});

Given("a conversa com o usuário de username {string} não está aparecendo na lista de conversas do usuário", (username) => {
  cy.get('[data-cy="conversation-list-username-'+username+'"]')
    .should(
      'not.exist'
  );
});

When("o usuário clica no usuário de username {string} da lista de amigos", (username) => {
  cy.get('[data-cy="friend-list-button-'+username+'"]')
    .click();
});

Then("o usuário deve estar na pagina da conversa de id {string} ao qual ele retornou", (id) => {
  cy.url().should(
    'include',
    "/user/"+userIdG+"/conversation/"+id
  );
});