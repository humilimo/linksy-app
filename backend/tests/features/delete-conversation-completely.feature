Feature: Delete Conversation Completely

  Scenario: Dono do Grupo Deleta Completamente o Grupo
    Given existe um user com id "1"
    And existe uma conversation com id "1", name "Projeto ESS - Grupo 6" e isGroup "true"
    And existe uma userConversation com userId "1", conversationId "1" e owner "true"
    When uma requisição "DELETE" for enviada para "/user/1/conversation/1/apagar_tudo"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter destroyMessage "Grupo 'Projeto ESS - Grupo 6' deletado completamente."