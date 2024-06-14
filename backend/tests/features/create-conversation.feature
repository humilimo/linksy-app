Feature: Create Conversation

  Scenario: Criar um Grupo
    Given existe um user com id 1, username "man2"
    And existe um user com id 2, username "lfoc"
    When uma requisição "POST" for enviada para "user/1/conversation"
    And o corpo da requisição é um JSON com isGroup true, name "grupo ess", picture "" e ids [2]
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter createMessage "'man2' criou o grupo 'grupo ess'."
    And o JSON da resposta deve conter addMessages ["'lfoc' foi adicionado ao grupo."]
  
  Scenario: Criar uma Conversa Simples
    Given existe um user com id 1, username "man2"
    And existe um user com id 2, username "lfoc"
    When uma requisição "POST" for enviada para "user/1/conversation"
    And o corpo da requisição é um JSON com isGroup false e ids [2]
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter beginMessage "'man2' iniciou uma conversa com 'lfoc'."

  Scenario: Retornar para uma Conversa Simples
    Given existe uma conversation com id 123, name null, picture null e isGroup false
    And existe um user com id 1, username "man2"
    And existe uma userConversation com userId 1, conversationId 123, owner false, leftConversation true
    And existe um user com id 2, username "lfoc"
    And existe uma userConversation com userId 2, conversationId 123 e owner false
    When uma requisição "POST" for enviada para "user/1/conversation"
    And o corpo da requisição é um JSON com isGroup false e ids [2]
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter returnMessage "'man2' voltou à conversa com 'lfoc'."