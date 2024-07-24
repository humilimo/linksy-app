Feature: Sign Up

    # GUI Scenarios

    Scenario: Cadastro sem sucesso por falta de username
        Given o usuário está na tela de cadastro
        When o usuário preenche o nome com "Luan" e o e-mail com "luan@email.com"
        And o usuário clica em Continuar
        Then deve existir a mensagem do erro "1"

    Scenario: Cadastro sem sucesso por senha pequena demais
        Given o usuário está na tela de cadastro
        When o usuário preenche o nome com "Luan", o usuário com "lbc2" e o e-mail com "luan@email.com"
        And o usuário clica em Continuar
        And o usuário preenche a senha com "1234567" e a confirmação "1234567"
        And o usuário clica em Cadastrar
        Then deve existir a mensagem do erro "2"

    Scenario: Cadastro sem sucesso por senhas diferentes
        Given o usuário está na tela de cadastro
        When o usuário preenche o nome com "Luan", o usuário com "lbc2" e o e-mail com "luan@email.com"
        And o usuário clica em Continuar
        And o usuário preenche a senha com "12345678" e a confirmação "1234567"
        And o usuário clica em Cadastrar
        Then deve existir a mensagem do erro "3"

    Scenario: Cadastro com sucesso
        Given o usuário está na tela de cadastro
        When o usuário preenche o nome com "Luan", o usuário com "lbc2" e o e-mail com "luan@email.com"
        And o usuário clica em Continuar
        And o usuário preenche a senha com "luan12345" e a confirmação "luan12345"
        And o usuário clica em Cadastrar
        Then o usuário deve estar na pagina da conversas do usuário de id "7"