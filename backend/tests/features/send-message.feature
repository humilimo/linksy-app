Feature: Get Conversation Details

  Scenario: Enviar mensagens em conversas
    Given existe um user com id 2, username "lfoc"
    And existe um user com id 4, username "gvab"
    And existe uma conversation com id 4, name null, picture null, isGroup false
    And existe uma userConversation com userId 2, conversationId 4
    And existe uma userConversation com userId 4, conversationId 4
    When uma requisição "POST" for enviada para "user/2/conversation/4"
    And o corpo da requisição é um JSON com content "Olá, tudo bem?"
    Then o status da resposta deve ser "201"
    And o JSON da resposta deve conter content "Olá, tudo bem?", senderId 2 e conversationId 4