Feature: View Conversation Messages

  Scenario: Visualizar mensagens em uma conversa
    Given existe um user com id 2, username "lfoc"
    And existe um user com id 4, username "gvab"
    And existe uma conversation com id 4, name null, picture null, isGroup false
    And existe uma userConversation com userId 2, conversationId 4
    And existe uma userConversation com userId 4, conversationId 4
    And existe uma mensagem com id 1, content "Olá, tudo bem?", senderId 2 e conversationId 4
    And existe uma mensagem com id 2, content "Tudo ótimo, e você?", senderId 4 e conversationId 4
    When uma requisição "GET" for enviada para "user/2/conversation/4"
    Then o status da resposta deve ser "200"
    And a resposta é um vetor de JSON, que deve conter uma lista de mensagens
    And a lista de mensagens deve conter uma mensagem com id 8, content "Oiii, Gabriel!", senderId 2, conversationId 4 e createdAt "2024-06-17T00:39:23.430Z"
    And a lista de mensagens deve conter uma mensagem com id 9, content "Tudo bem?", senderId 2, conversationId 4 e createdAt "2024-06-17T00:40:23.430Z"
    And a lista de mensagens deve conter uma mensagem com id 10, content "Tudo bem simmm!", senderId 4, conversationId 4 e createdAt "2024-06-17T00:41:23.430Z"
    And a lista de mensagens deve conter uma mensagem com id 11, content "E com você ?", senderId 4, conversationId 4 e createdAt "2024-06-17T00:42:23.430Z"
