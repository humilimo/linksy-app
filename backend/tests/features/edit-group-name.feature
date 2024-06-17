Feature: edit group name

    Scenario: dono do grupo altera o nome do grupo
        Given existe um usuário de id "1" e username "crc"
        And existe uma conversation de id "1" e nome "grupo ess"
        And existe um user conversation de idUser "1", idConversation "1" e owner "true"
        When uma requisição "PATCH" for enviada para "/user/1/conversation/1" com o corpo sendo um JSON com name "grupo eletromag"
        Then o status de resposta deve ser "200"
        And o JSON da resposta deve conter o newNameMessage "'crc' alterou o nome do grupo para 'grupo eletromag'."