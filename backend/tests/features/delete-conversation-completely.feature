Feature: Delete Conversation Completely

  Scenario: Dono do Grupo Deleta Completamente o Grupo
    Given existe um user com id 1
    And existe uma conversation com id 123, name "grupo ess" e isGroup true
    And existe uma userConversation com idUser 1, idConversation 123 e owner true
    When uma requisição "DELETE" for enviada para "user/1/conversation/123/apagar_tudo"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter destroyMessage "Grupo 'grupo ess' deletado completamente."