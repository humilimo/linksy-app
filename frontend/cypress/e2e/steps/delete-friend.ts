import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

var userId;

Given('eu estou logado no usuário de id {string}, username {string} e password {string}', (id: string, username: string, password: string) => {
    userId = id
    cy.login(username, password);
});

Given('eu estou na página da lista de conversas', () => {
    cy.visit("/user/"+userId+"/conversation");
});

When('eu abro o modal da lista de amigos', () => {
    cy.get('[data-cy="new-conversation-button"]').click(); 
});

Then('o usuário de nome {string} está na lista de amigos', (name: string) => {
    cy.get('[data-cy="friends-list-'+name+'"]').should('exist'); 
});

When('eu clico no ícone de lixeira ao lado das informações do usuário {string}', (name: string) => {
    cy.get('[data-cy="friends-list-delete-icon'+name+'"]').click(); 
});

Then('o usuário de nome {string} não deve estar mais listado como amigo', (name: string) => {
    cy.get('[data-cy="friends-list-'+name+'"]').should('not.exist'); 
});




