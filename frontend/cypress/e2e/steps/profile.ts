import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Given("o usuário está logado com o usuário de id {string}, username {string} e senha {string}", (userId, userUsername: string, userPassword: string) => {
    cy.login(userUsername, userPassword);
    cy.wait(500);
    cy.visit("/user/"+userId+"/conversation");
    cy.wait(500);
});

When("o usuário clica em Perfil", () => {
    cy.get('[data-cy="profile-button"]')
    .click();
});

Then("o usuário consegue ver sua foto, nome, username e bio", () => {
    cy.get('[data-cy="edit-picture-button"]')
    .should(
      'exist'
    );

    cy.get('[data-cy="edit-name-button"]')
    .should(
      'exist'
    );

    cy.get('[data-cy="edit-username-button"]')
    .should(
      'exist'
    );

    cy.get('[data-cy="edit-bio-button"]')
    .should(
      'exist'
    );
});



When("o usuário clica em Editar Nome", () => {
    cy.get('[data-cy="edit-name-button"]')
    .click();
});

When("o usuário preenche o nome com {string}", (name: string) => {
    cy.get('[data-cy="edit-name"]')
    .type(name);
});

When("o usuário clica em Confirmar Nome", () => {
    cy.get('[data-cy="confirm-name-button"]')
    .click();
});

Then("o usuário tem o nome {string}", (name: string) => {
    cy.get('[data-cy="profile-name"]')
    .should('have.text', name);
});



When("o usuário clica em Editar Usuário", () => {
    cy.get('[data-cy="edit-username-button"]')
    .click();
});

When("o usuário preenche o campo com {string}", (username: string) => {
    cy.get('[data-cy="edit-username"]')
    .type(username);
});

When("o usuário clica em Confirmar Username", () => {
    cy.get('[data-cy="confirm-username-button"]')
    .click();
});

Then("deve existir a mensagem de erro", () => {
    cy.get('[data-cy="username-error-message"]')
    .should(
      'exist'
    );
});