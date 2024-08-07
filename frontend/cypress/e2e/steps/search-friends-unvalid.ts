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

When('eu preencho o input de pesquisa com o username {string}', (username:string) => {
    cy.get('[data-cy="search-friend-input"]').type(username);
});

Then('uma mensagem de erro {string} é exibida', (message: string) => {
    cy.contains(message).should('be.visible');
  });