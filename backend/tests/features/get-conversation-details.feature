Feature: Get Conversation Details

  Scenario: Dono do Grupo Obtem Detalhes do Grupo
    Given existe uma conversation com id 123, name "grupo ess", picture null, isGroup true e createdAt "2024-06-14T17:27:20.589Z"
    And existe um user com id 1, name "Mateus", username "man2" e picture null
    And existe uma userConversation com userId 1, conversationId 123 e owner true
    And existe um user com id 2, name "Luis", username "lfoc" e picture null
    And existe uma userConversation com userId 2, conversationId 123 e owner false
    When uma requisição "GET" for enviada para "user/1/conversation/123/perfil"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter owner true
    And o JSON da resposta deve conter conversation com id 123, name "grupo ess", picture null, isGroup true e createdAt "2024-06-14T17:27:20.589Z"
    And o JSON da resposta deve conter um array participants
    And o participant com id 1, name "Mateus", username "man2" e picture null está no array participants
    And o participant com id 2, name "Luis", username "lfoc" e picture null está no array participants

  Scenario: Membro do Grupo Obtem Detalhes do Grupo
    Given existe uma conversation com id 123, name "grupo ess", picture null, isGroup true e createdAt "2024-06-14T17:27:20.589Z"
    And existe um user com id 1, name "Mateus", username "man2" e picture null
    And existe uma userConversation com userId 1, conversationId 123 e owner true
    And existe um user com id 2, name "Luis", username "lfoc" e picture null
    And existe uma userConversation com userId 2, conversationId 123 e owner false
    When uma requisição "GET" for enviada para "user/2/conversation/123/perfil"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter owner false
    And o JSON da resposta deve conter conversation com id 123, name "grupo ess", picture null, isGroup true e createdAt "2024-06-14T17:27:20.589Z"
    And o JSON da resposta deve conter um array participants
    And o participant com id 1, name "Mateus", username "man2" e picture null está no array participants
    And o participant com id 2, name "Luis", username "lfoc" e picture null está no array participants

  Scenario: Usuário Obtem Detalhes de uma Conversa Simples
    Given existe uma conversation com id 123, name null, picture null isGroup false
    And existe um user com id 1, name "Mateus", username "man2", email "man2@email.com", picture null e bio "Oi!"
    And existe uma userConversation com userId 1, conversationId 123 e owner false
    And existe um user com id 2, name "Luis", username "lfoc", email "lfoc@email.com", picture null e bio "Olá!"
    And existe uma userConversation com userId 2, conversationId 123 e owner false
    When uma requisição "GET" for enviada para "user/1/conversation/123/perfil"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter id 2, name "Luis", username "lfoc", email "lfoc@email.com", picture null e bio "Olá!"