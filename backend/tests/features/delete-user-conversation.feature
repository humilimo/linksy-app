Feature: remove user from a group

    Scenario: dono do grupo remove usuário do grupo
        Given existe um usuário de id "1" e username "crc"
        And existe um usuário de id "2" e username "man2"
        And existe uma conversation de id "1"
        And existe um user conversation de idUser "1", idConversation "1" e owner "true"
        And existe um user conversation de idUser "2", idConversation "1", owner "false" e leftConversation "false"
        When uma requisição "PATCH" for enviada para "/user/1/conversation/1/remover/2"
        Then o status de resposta deve ser "200"
        And o JSON da resposta deve conter o content "'man2' foi removido do grupo."
    