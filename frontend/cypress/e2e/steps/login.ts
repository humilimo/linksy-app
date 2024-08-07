import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('eu estou na página de login', () => {
    cy.visit("/");
});

When('eu preencho o input de username com {string}', (username:string) => {
    cy.get('[data-cy="username-input"]').type(username); 
});

When('eu preencho o input de password com {string}', (password:string) => {
    cy.get('[data-cy="password-input"]').type(password); 
});

When('eu clico no botão de entrar', () => {
    cy.get('[data-cy="login-button"]').click(); 
});

Then('eu sou redirecionado para a página de conversas do usuário {string} de id {string}', (name: string, id:string) => {
    const expectedUrl = `/user/${id}/conversation`;

    cy.url().should('include', expectedUrl);  
});

