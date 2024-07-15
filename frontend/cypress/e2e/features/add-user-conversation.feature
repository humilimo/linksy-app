Feature: add user to a group

    Scenario: dono do grupo adiciona usuário ao grupo
        Given estou na página da conversa de id "8"
        And estou logado no usuário de id "1"
        When abro o perfil do grupo
        And clico no botão adicionar
        And clico na checkbox do usuário de username "gvab"
        And clico em confirmar
        Then o usuário de username "gvab" está na lista de participantes de grupo