Feature: leave conversation

    Scenario: usuário sai de um grupo
        Given estou na página da conversa de id "8"
        And estou logado no usuário de id "3"
        When abro o perfil do grupo
        And clico no botão sair do grupo
        And clico em sair
        Then estou na página de lista de conversas
        And a conversa de id "8" não está na lista
