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
    'estou logado no usuário de id {string}',
    (id: string) => {
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
    'clico no botão adicionar',
    () => {
        cy.get('[data-cy="conversation-profile-participants-add-button"]').click();
    }
);

When(
    'clico na checkbox do usuário de username {string}',
    (username) => {
        cy.get('[data-cy="friend-list-checkbox-'+username+'"]').click();
    }
);

When(
    'clico em confirmar',
    () => {
        cy.get('[data-cy="confirm-add-participants-button"]').click();
    }
);

Then(
    'o usuário de username {string} está na lista de participantes de grupo',
    (username: string) => {
        cy.get('[data-cy="conversation-profile-button"]').click();
        cy.get('[data-cy="conversation-profile-participants-list"]').contains(username);
    }
);