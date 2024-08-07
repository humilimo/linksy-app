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

When('o usuário de nome {string} não está na lista de amigos', (name: string) => {
    cy.get('[data-cy="friends-list-'+name+'"]').should('not.exist');
});

When('eu abro o modal de adição de amigos', () => {
    cy.get('[data-cy="add-friend-modal-button"]').click(); 
});

When('eu preencho o input com o username {string}', (username:string) => {
    cy.get('[data-cy="friend-username-input"]').type(username);
});

When('eu clico no botão de adicionar amigo', () => {
    cy.get('[data-cy="confirm-add-friend-button"]').click(); 
});

Then('o usuário de nome {string} deve estar na lista de amigos', (name: string) => {
    cy.get('[data-cy="friends-list-'+name+'"]').should('exist'); 
});

