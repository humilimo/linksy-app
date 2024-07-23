import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

var conversationId: string = ""
var loggedId: string = ""
var oldName: string = ""

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

Given(
    'o nome do grupo é {string}',
    (name: string) => {
        cy.get('[data-cy="conversation-profile-group-name"]').should('have.text', name);
    }
);

When(
    'abro o perfil do grupo',
    () => {
        cy.get('[data-cy="conversation-profile-button"]').click();
    }
);

When(
    'clico no botão editar nome do grupo',
    () => {
        cy.get('[data-cy="conversation-profile-group-name-edit-button"]').click();
    }
);

When(
    'insiro {string}',
    (newName: string) => {
        cy.get('[name="groupName"]').type(newName);
    }
);

When(
    'clico em confirmar',
    () => {
        cy.get('[data-cy="confirm-new-group-name"]').click();
    }
);

Then(
    'o novo nome do grupo é {string}',
    (name: string) => {
        cy.get('[data-cy="conversation-profile-button"]').click();
        cy.get('[data-cy="conversation-profile-group-name"]').should('have.text', name);
    }
);