Feature: Create Conversation

  Scenario: Criar um Grupo
    Given existe um user com id "1" e username "man2"
    And existe um user com id "2" e username "lfoc"
    When o corpo da requisição é um JSON com isGroup "true", name "Sandeiro Cinza", picture "null" e o array de inteiros ids
    And o array ids deve conter o inteiro "2"
    And uma requisição "POST" for enviada para "/user/1/conversation"
    Then o status da resposta deve ser "201"
    And o JSON da resposta deve conter message "create group"
    And o JSON da resposta deve conter o id da nova conversa criada
  
  Scenario: Criar uma Conversa Simples
    Given existe um user com id "1" e username "man2"
    And existe um user com id "3" e username "crc"
    When o corpo da requisição é um JSON com isGroup "false", name "null", picture "null" e o array de inteiros ids
    And o array ids deve conter o inteiro "3"
    And uma requisição "POST" for enviada para "/user/1/conversation"
    Then o status da resposta deve ser "201"
    And o JSON da resposta deve conter message "create"
    And o JSON da resposta deve conter o id da nova conversa criada

  Scenario: Retornar para uma Conversa Simples
    Given existe um user com id "1" e username "man2"
    And existe um user com id "2" e username "lfoc"
    And existe uma conversation com id "2" e isGroup "false"
    And existe uma userConversation com userId "1", conversationId "2", owner "false" e leftConversation "true"
    And existe uma userConversation com userId "2", conversationId "2" e owner "false"
    When o corpo da requisição é um JSON com isGroup "false", name "null", picture "null" e o array de inteiros ids
    And o array ids deve conter o inteiro "2"
    And uma requisição "POST" for enviada para "/user/1/conversation"
    Then o status da resposta deve ser "201"
    And o JSON da resposta deve conter message "return"
    And o JSON da resposta deve conter o id da nova conversa criada