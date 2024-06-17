Feature: add user to a group

    Scenario: dono do grupo adiciona usuário ao grupo
        Given existe um usuário de id "1" e username "man2"
        And existe um usuário de id "5" e username "mms11"
        And existe uma conversation de id "8"
        And existe um user conversation de idUser "1", idConversation "8" e owner "true"
        And não existe um user conversation de idUser "5", idConversation "8" e leftConversation "false"
        When uma requisição "POST" for enviada para "/user/1/conversation/1/adicionar" com o corpo sendo um JSON com ids "5"
        Then o status de resposta deve ser "201"
        And a resposta deve conter a lista de string com o elemento "'mms11' foi adicionado ao grupo."
    