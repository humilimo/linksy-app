Feature: Get Conversation Details

  Scenario: Obter Detalhes de um Grupo
    Given existe um user com id "1", name "Mateus", username "man2", email "man2@cin.ufpe.br", picture "null" e bio "null"
    And existe um user com id "3", name "Caio", username "crc", email "crc@cin.ufpe.br", picture "null" e bio "null"
    And existe uma conversation com id "3", name "Grupo com Caio", picture "null", isGroup "true" e createdAt "2024-06-14T17:27:20.589Z"
    And existe uma userConversation com userId "1", conversationId "3" e owner "true"
    And existe uma userConversation com userId "3", conversationId "3" e owner "false"
    When uma requisição "GET" for enviada para "/user/1/conversation/3/profile"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter owner "true"
    And o JSON da resposta deve conter conversation com id "3", name "Grupo com Caio", picture "null", isGroup "true" e createdAt "2024-06-14T17:27:20.589Z"
    And o JSON da resposta deve conter um array participants
    And o array participants deve conter o participant com id "1", name "Mateus", username "man2" e picture "null"
    And o array participants deve conter o participant com id "3", name "Caio", username "crc" e picture "null"

  Scenario: Obter Detalhes de uma Conversa Simples
    Given existe um user com id "1", name "Mateus", username "man2", email "man2@cin.ufpe.br", picture "null" e bio "null"
    And existe um user com id "2", name "Luis", username "lfoc", email "lfoc@cin.ufpe.br", picture "null" e bio "null"
    And existe uma conversation com id "2", name "null", picture "null", isGroup "false" e createdAt "2024-06-15T19:43:20.589Z"
    And existe uma userConversation com userId "1", conversationId "2" e owner "false"
    And existe uma userConversation com userId "2", conversationId "2" e owner "false"
    When uma requisição "GET" for enviada para "/user/2/conversation/2/profile"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter id "1", name "Mateus", username "man2", email "man2@cin.ufpe.br", picture "null" e bio "null"