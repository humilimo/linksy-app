import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";

Given("o usuário de id {string} está na página da conversa de id {string}", (userId, conversationId) => {
  cy.visit("/user/"+userId+"/conversation/"+conversationId);
});

When("o usuário clica no perfil da conversa", () => {
  cy.get('[data-cy="conversation-profile-button"]')
    .click();
});

Then("o nome do grupo {string} é exibido na tela", (name) => {
  cy.get('[data-cy="conversation-profile-group-name"]')
    .should(
      'have.text',
      name
    );
});

Then("a imagem {string} do grupo é exibida na tela", (picture) => {
  cy.get('[data-cy="conversation-profile-group-picture"]').invoke('attr', 'src').then((src) => {
    if (src) {
      cy.get('[data-cy="conversation-profile-group-picture"]')
        .should(
          'have.attr',
          'src',
          picture
        );
    } else {
      cy.get('[data-cy="conversation-profile-group-picture"]')
        .should(
          'have.class',
          picture
        );
    }
  });
});

Then("há uma opção de editar o nome do grupo", () => {
  cy.get('[data-cy="conversation-profile-group-name-edit-button"]')
    .should(
      'exist'
    );
});

Then("a lista de participantes é exibida na tela", () => {
  cy.get('[data-cy="conversation-profile-participants-list"]')
    .should(
      'exist'
    );
});

Then("a lista de participantes contém o usuário de username {string}", (username) => {
  cy.get('[data-cy="conversation-profile-participant-'+username+'"]')
    .should(
      'exist'
    );
});

Then("o usuário {string} apresenta uma tag dono", (username) => {
  cy.get('[data-cy="conversation-profile-owner-'+username+'"]')
    .should(
      'exist'
    );
});

Then("há uma opção de remover o usuário {string}", (username) => {
  cy.get('[data-cy="conversation-profile-participant-'+username+'-remove"]')
    .should(
      'exist'
    );
});

Then("há uma opção de adicionar novos participantes", () => {
  cy.get('[data-cy="conversation-profile-participants-add-button"]')
    .should(
      'exist'
    );
});

Then("há um opção de deletar o grupo", () => {
  cy.get('[data-cy="conversation-profile-delete-group-button"]')
    .should(
      'exist'
    );
});

Then("há um opção de sair do grupo", () => {
  cy.get('[data-cy="conversation-profile-leave-group-button"]')
    .should(
      'exist'
    );
});

// ============================================================

Then("a imagem {string} do usuário é exibida na tela", (picture) => {
  cy.get('[data-cy="conversation-profile-user-picture"]').invoke('attr', 'src').then((src) => {
    if (src) {
      cy.get('[data-cy="conversation-profile-user-picture"]')
        .should(
          'have.attr',
          'src',
          picture
        );
    } else {
      cy.get('[data-cy="conversation-profile-user-picture"]')
        .should(
          'have.class',
          picture
        );
    }
  });
});

Then("o nome {string} do usuário é exibido na tela", (name) => {
  cy.get('[data-cy="conversation-profile-user-name"]')
    .should(
      'have.text',
      name
    );
});

Then("o username {string} do usuário é exibido na tela", (username) => {
  cy.get('[data-cy="conversation-profile-user-username"]')
    .should(
      'have.text',
      '('+username+')'
    );
});

Then("o email {string} do usuário é exibido na tela", (email) => {
  cy.get('[data-cy="conversation-profile-user-email"]')
    .should(
      'have.text',
      email
    );
});

Then("a bio {string} do usuário é exibida na tela", (bio) => {
  cy.get('[data-cy="conversation-profile-user-bio"]')
    .should(
      'have.text',
      bio
    );
});

Then("há um opção de excluir a conversa", () => {
  cy.get('[data-cy="conversation-profile-delete-conversation-button"]')
    .should(
      'exist'
    );
});
