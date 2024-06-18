
Feature: Login de usuários

    Scenario: Login com credenciais válidas
        Given existe um user com id "6", username "ljat", e password "lucas12345"
        When o corpo da requisição é um JSON com username "ljat" e password "lucas12345"
        And uma requisição "POST" for enviada para "/user/login"
        Then o status da resposta deve ser "201"
        And o JSON da resposta deve conter auth "true"
        And o JSON da resposta deve conter token válido

    Scenario: Login com senha inválida
        Given existe um user com id "6", username "ljat", e password "lucas12345"
        When o corpo da requisição é um JSON com username "ljat" e password "lucas1234"
        And uma requisição "POST" for enviada para "/user/login"
        Then o status da resposta deve ser "401"
        And o JSON da resposta deve conter message "Senha inválida."

    Scenario: Login com usuário não cadastrado
        Given não existe um user com username "lj"
        When o corpo da requisição é um JSON com username "lj" e password "Lucas1234"
        And uma requisição "POST" for enviada para "/user/login"
        Then o status da resposta deve ser "401"
        And o JSON da resposta deve conter message "Usuário não cadastrado."
