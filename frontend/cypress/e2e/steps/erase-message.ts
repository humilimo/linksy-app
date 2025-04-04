import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

var userId;
var conversationId;
var mensagem;
var messageId;


Given('estou logado no usuário de username {string}, password {string} e id {string}', (username: string, password: string, id: string) => {
    userId = id
    cy.login(username, password);
});

Given('estou na lista de conversas', () => {
    cy.visit("/user/"+userId+"/conversation");
});

When('seleciono a página da conversa de id {string}', (id:string) => {
        conversationId = id;
        cy.visit("/user/"+userId+"/conversation/"+conversationId);
   
});

Then('existe a mensagem {string} na conversa', (mensagem: string) => {
    cy.get('[data-cy="message-'+mensagem+'"]').should('exist'); 
});

When('eu clico no ícone de lixeira ao lado da mensagem {string} de id {string}', (mensagem: string, messageId: string) => {
    cy.get('[data-cy="trash-icon-'+mensagem+'-'+messageId+'"]').click(); 
});
When('clico no botão apagar para todos', () => {
    cy.get('[data-cy="apagar"]').click(); 
});

Then('a mensagem {string} é apagada da página da conversa', (mensagem: string) => {
    cy.get('[data-cy="message-'+mensagem+'"]').should('not.exist'); 
});




