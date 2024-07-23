import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

var userId;

Given('eu estou logado no usuário de id {string}, username {string} e password {string}', (id: string, username: string, password: string) => {
    userId = id
    cy.login(username, password);
});

Given('eu estou na pagina da lista de conversas', () => {
    cy.visit("/user/"+userId+"/conversation");
});

When('eu abro o modal da lista de amigos', () => {
    cy.get('[data-cy="new-converastion-button"]').click(); // Seletor do botão que abre o modal
});

When('o usuário de nome {string} está na lista de amigos', (name: string) => {
    cy.get('[data-cy="friends-list-'+name+'"]').should('exist'); // Verifica se o usuário foi adicionado à lista de amigos
});

When('eu abro o modal de adição de amigos', () => {
    cy.get('[data-cy="add-friend-modal-button"]').click(); // Seletor do botão de adicionar amigo no modal
});

When('eu preencho o input com o username {string}', (username:string) => {
    cy.get('[data-cy="friend-username-input"]').type(username); // Seletor do campo de input para o nome do amigo
});

When('eu clico no botão de adicionar amigo', () => {
    cy.get('[data-cy="confirm-add-friend-button"]').click(); // Seletor do botão de confirmar adição de amigo
});

Then('uma mensagem de erro {string} é exibida', (message: string) => {
    cy.contains(message).should('be.visible');
  });

