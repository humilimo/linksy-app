Feature: Profile

    # GUI Scenarios

    Scenario: Visualização do próprio perfil
        Given o usuário está logado com o usuário de id "7", username "lbc2" e senha "luan12345"
        When o usuário clica em Perfil
        Then o usuário consegue ver sua foto, nome, username e bio

    Scenario: Edição de nome com sucesso
        Given o usuário está logado com o usuário de id "7", username "lbc2" e senha "luan12345"
        When o usuário clica em Perfil
        And o usuário clica em Editar Nome
        And o usuário preenche o nome com "Luan Coelho"
        And o usuário clica em Confirmar
        Then o usuário tem o nome "Luan Coelho"

    Scenario: Edição de username sem sucesso
        Given o usuário está logado com o usuário de id "7", username "lbc2" e senha "luan12345"
        When o usuário clica em Perfil
        And o usuário clica em Editar Usuário
        And o usuário preenche o campo com "lfoc"
        And o usuário clica em Confirmar
        Then deve existir a mensagem de erro