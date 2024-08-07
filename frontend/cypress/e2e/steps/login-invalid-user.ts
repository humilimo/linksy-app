import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('eu estou na página de login', () => {
    cy.visit("/");
});

When('eu preencho o input de username com {string}', (username:string) => {
    cy.get('[data-cy="username-input"]').type(username); // Seletor do campo de input para o nome do amigo
});

When('eu preencho o input de password com {string}', (password:string) => {
    cy.get('[data-cy="password-input"]').type(password); // Seletor do campo de input para o nome do amigo
});

When('eu clico no botão de entrar', () => {
    cy.get('[data-cy="login-button"]').click(); // Seletor do botão de confirmar adição de amigo
});

Then('uma mensagem de erro {string} é exibida', (message: string) => {
    cy.contains(message).should('be.visible');
  });