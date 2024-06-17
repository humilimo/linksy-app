Feature: add user to a group

    Scenario: dono do grupo adiciona usuário ao grupo
        Given existe um usuário de id "1" e username "crc"
        And existe um usuário de id "2" e username "man2"
        And existe uma conversation de id "1" e nome "grupo ess"
        And existe um user conversation de idUser "1", idConversation "1" e owner "true"
        And não existe um user conversation de idUser "2", idConversation "1" e leftConversation "false"
        When uma requisição "POST" for enviada para "user/1/conversation/1/adicionar" com o corpo sendo um JSON com ids "2"
        Then o status de resposta deve ser "201"
        And a resposta deve conter a lista de string com o elemento "'man2' foi adicionado ao grupo."
    