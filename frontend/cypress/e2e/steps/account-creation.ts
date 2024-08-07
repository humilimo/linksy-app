import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("o usuário está na tela de cadastro", () => {
    cy.visit("/signUp");
    cy.wait(500);
});

When("o usuário preenche o nome com {string} e o e-mail com {string}", (name: string, email: string) => {
    cy.get('[data-cy="sign-up-name"]')
    .type(name);

    cy.get('[data-cy="sign-up-email"]')
    .type(email);
});

When("o usuário clica em Continuar", () => {
    cy.get('[data-cy="sign-up-next-button"]')
    .click();
});

Then("deve existir a mensagem do erro {string}", (number) => {
    cy.get('[data-cy="sign-up-error-'+number+'"]')
    .should(
      'exist'
    );
});



When("o usuário preenche o nome com {string}, o usuário com {string} e o e-mail com {string}", (name: string, username: string, email: string) => {
    cy.get('[data-cy="sign-up-name"]')
    .type(name);

    cy.get('[data-cy="sign-up-username"]')
    .type(username);

    cy.get('[data-cy="sign-up-email"]')
    .type(email);
});

When("o usuário preenche a senha com {string} e a confirmação {string}", (password: string, passConfirmation: string) => {
    cy.get('[data-cy="sign-up-password"]')
    .type(password);

    cy.get('[data-cy="sign-up-passConfirmation"]')
    .type(passConfirmation);
});

When("o usuário clica em Cadastrar", () => {
    cy.get('[data-cy="sign-up-button"]')
    .click();
    cy.wait(500);
});



Then("o usuário deve estar na pagina da conversas do usuário de id {string}", (id) => {
    cy.url().should(
      'include',
      "/user/"+id+"/conversation"
    );
  });


