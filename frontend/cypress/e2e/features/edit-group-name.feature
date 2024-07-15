Feature: edit group name

    Scenario: dono do grupo altera o nome do grupo
        Given estou na página da conversa de id "8"
        And estou logado no usuário de id "1"
        And o nome do grupo é "grupo ess"
        When abro o perfil do grupo
        And clico no botão editar nome do grupo
        And insiro "eletromag"
        And clico em confirmar
        Then o novo nome do grupo é "eletromag"
