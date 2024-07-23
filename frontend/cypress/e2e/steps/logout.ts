import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

var userId;

Given('eu estou logado no usuário de id {string}, username {string} e password {string}', (id: string, username: string, password: string) => {
    userId = id
    cy.login(username, password);
});

Given('eu estou na pagina da lista de conversas', () => {
    cy.visit("/user/"+userId+"/conversation");
});

When('eu clico no botão de logout', () => {
    cy.get('[data-cy="logout-button"]').click(); // Seletor do botão de confirmar adição de amigo
});

Then('eu sou redirecionado para a página de login', () => {
    const expectedUrl = `http://localhost:3000`;

    // Verifica se a URL atual corresponde à URL esperada
    cy.url().should('include', expectedUrl);  
});