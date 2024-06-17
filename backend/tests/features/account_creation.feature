Feature: Cadastro de Usuários
As a usuário do sistema
I want to cadastrar uma conta com meu nome, meu user, meu e-mail e minha senha no sistema 
So that eu posso me comunicar com outros usuários

# Service Scenarios

    Scenario: Cadastro com sucesso
    Given O usuário quer realizar um cadastro no sistema
    When uma requisição POST com um JSON com name "luis", username "luis", email "luis@email.com", password "123456789" de corpo
    And esta requisição for enviada para "user/register"
    Then o status da resposta deve ser "201"
    And o JSON da resposta deve conter id "1", name "luis", username "luis", email "luis@email.com", password "123456789", bio "null", picture "null"

    Scenario: Cadastro sem sucesso por senha pequena demais
    Given O usuário quer realizar um cadastro no sistema
    When uma requisição POST com um JSON com name "luis", username "luis", email "luis@email.com", password "1234567" de corpo
    And esta requisição for enviada para "user/register"
    Then o status da resposta deve ser "400"
    And o JSON deve conter message "password must be longer than or equal to 8 characters"

    Scenario: Cadastro sem sucesso por falta de username
    Given O usuário quer realizar um cadastro no sistema
    When uma requisição POST com um JSON com name "luis", email "luis@email.com", password "123456789" de corpo
    And esta requisição for enviada para "user/register"
    Then o status da resposta deve ser "400"
    And o JSON deve conter message "username should not be empty"

    
