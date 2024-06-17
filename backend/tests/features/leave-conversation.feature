Feature: leave conversation

    Scenario: usuário sai de um grupo
        Given existe um usuário de id "3" e username "crc"
        And existe uma conversation de id "8"
        And existe um user conversation de idUser "3", idConversation "8", owner "false" e leftConversation "false"
        When uma requisição "PATCH" for enviada para "/user/3/conversation/8/sair"
        Then o status de resposta deve ser "200"
        And o JSON da resposta deve conter o content "'crc' saiu do grupo."