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
    cy.get('[data-cy="new-converastion-button"]').click(); 
});

When('o usuário de nome {string} está na lista de amigos', (name: string) => {
    cy.get('[data-cy="friends-list-'+name+'"]').should('exist');
});

When('eu preencho o input de pesquisa com o username {string}', (username:string) => {
    cy.get('[data-cy="search-friend-input"]').type(username);
});

Then('o usuário de nome {string} se torna o único na listagem', (name:string) => {
    cy.get('[data-cy="friends-list"]').should('have.length', 1) 
      .contains(name) 
      .should('be.visible'); 
  });