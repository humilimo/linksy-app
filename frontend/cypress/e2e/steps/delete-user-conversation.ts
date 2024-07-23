import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

var conversationId: string = ""
var loggedId: string = ""
var deleteUsername: string = ""

Given(
    'estou na página da conversa de id {string}',
    (id: string) => {
        conversationId = id;
    }
);

Given(
    'estou logado no usuário de username {string}, senha {string} e id {string}',
    (username: string, password: string, id: string) => {
        cy.login(username, password);
        loggedId = id;
        cy.visit("/user/"+loggedId+"/conversation/"+conversationId);
    }
);

When(
    'abro o perfil do grupo',
    () => {
        cy.get('[data-cy="conversation-profile-button"]').click();
    }
);

When(
    'clico no botão deletar do usuário de username {string}',
    (username: string) => {
        deleteUsername = username;
        cy.get('[data-cy="conversation-profile-participant-'+username+'-remove"]').click();
    }
);

When(
    'clico em remover',
    () => {
        cy.get('[data-cy="confirm-remove-participant-'+deleteUsername+'-button"]').click();
    }
);

Then(
    'o usuário de username {string} não está na lista de participantes de grupo',
    (username: string) => {
        cy.get('[data-cy="conversation-profile-button"]').click();
        cy.get('[data-cy="conversation-profile-participants-list"]').should('not.have.text', username);
    }
);