Feature: remove user from a group

    Scenario: dono do grupo remove usuário do grupo
        Given estou na página da conversa de id "8"
        And estou logado no usuário de username "man2", senha "mateus12345" e id "1"
        When abro o perfil do grupo
        And clico no botão deletar do usuário de username "lfoc"
        And clico em remover
        Then o usuário de username "lfoc" não está na lista de participantes de grupo
    