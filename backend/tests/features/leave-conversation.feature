Feature: leave conversation

    Scenario: usuário sai de um grupo
        Given existe um usuário de id "2" e username "man2"
        And existe uma conversation de id "1"
        And existe um user conversation de idUser "2", idConversation "1", owner "false" e leftConversation "false"
        When uma requisição "PATCH" for enviada para "/user/2/conversation/1/sair"
        Then o status de resposta deve ser "200"
        And o JSON da resposta deve conter o content "'man2' saiu do grupo."