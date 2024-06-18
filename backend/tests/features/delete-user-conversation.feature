Feature: remove user from a group

    Scenario: dono do grupo remove usuário do grupo
        Given existe um usuário de id "1" e username "man2"
        And existe um usuário de id "2" e username "lfoc"
        And existe uma conversation de id "8"
        And existe um user conversation de idUser "1", idConversation "8" e owner "true"
        And existe um user conversation de idUser "2", idConversation "8", owner "false" e leftConversation "false"
        When uma requisição "PATCH" for enviada para "/user/1/conversation/8/remover/2"
        Then o status de resposta deve ser "200"
        And o JSON da resposta deve conter o content "'lfoc' foi removido do grupo."
    