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
    'clico no botão sair do grupo',
    () => {
        cy.get('[data-cy="conversation-profile-leave-group-button"]').click();
    }
);

When(
    'clico em sair',
    () => {
        cy.get('[data-cy="confirm-leave-conversation-button"]').click();
    }
);

Then(
    'estou na página de lista de conversas',
    () => {
        cy.url().should('eq', Cypress.config().baseUrl + '/user/'+loggedId+'/conversation');
    }
);

Then(
    'a conversa de id {string} não está na lista',
    (id: string) => {
        cy.get('[data-cy="conversation-id-'+id+'"]').should('not.exist');
    }
);