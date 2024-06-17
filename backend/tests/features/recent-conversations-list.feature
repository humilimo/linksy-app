Feature: Lista de Conversas
As a Usuário do sistema
I want to Ver uma lista das minhas conversas no sistema
So that Eu possa acessar interações recentes rapidamente.

Scenario: Favoritar uma conversa
    Given existe um user com id "4" e username "gvab"
    And existe uma conversation com id "5" com isGroup "false" e name "null"
    And existe uma userConversation com userId "4" e conversationId "5" e leftConversation "false" e favorited "false"
    When uma requisição "PATCH" for enviada para "/user/4/conversation/5/favoritar"
    Then o status da resposta deve ser "200"
    And o JSON de resposta deve conter userId "4" e consersationId "5" e leftConversation "false" e favorited "true"

Scenario: Desfavoritar uma conversa
    Given existe um user com id "4" e username "gvab"
    And existe uma conversation com id "5" com isGroup "false" e name "null"
    And existe uma userConversation com userId "4" e conversationId "5" e leftConversation "false" e favorited "true"
    When uma requisição "PATCH" for enviada para "/user/4/conversation/5/favoritar"
    Then o status da resposta deve ser "200"
    And o JSON de resposta deve conter userId "4" e consersationId "5" e leftConversation "false" e favorited "false"
    
Scenario: Lista de conversas recentes
    Given existe um user com id "4" e username "gvab"
    And existe um user com id "1" e username "man2"
    And existe um user com id "2" e username "lfoc"
    
    And existe uma conversation com id "5" com isGroup "false" e name "null"
    And existe uma conversation com id "6" com isGroup "true" e name "Peneira"
    And existe uma conversation com id "7" com isGroup "false" e name "null"

    And existe uma userConversation com userId "4" e conversationId "5" e leftConversation "false" e favorited "false"
    And existe uma userConversation com userId "1" e conversationId "5" e leftConversation "false" e favorited "false"

    And existe uma userConversation com userId "4" e conversationId "6" e leftConversation "false" e favorited "false"
    And existe uma userConversation com userId "1" e conversationId "6" e leftConversation "false" e favorited "false"
    And existe uma userConversation com userId "2" e conversationId "6" e leftConversation "false" e favorited "false"

    And existe uma userConversation com userId "4" e conversationId "7" e leftConversation "false" e favorited "true"
    And existe uma userConversation com userId "2" e conversationId "7" e leftConversation "false" e favorited "false"
    
    And existe uma message de id "17" com conversationId "5" com content "Boa tarde Mateus!" e createdAt "2024-06-16T23:40:24.421Z" e senderId "4" 
    And existe uma message de id "18" com conversationId "5" com content "Boa, tudo bom com voce gabriel?" e createdAt "2024-06-16T23:40:47.428Z" e senderId "1"
    And existe uma message de id "19" com conversationId "6" com content "Boa tarde grupo!" e createdAt "2024-06-16T23:49:00.321Z" e senderId "4"
    And existe uma message de id "20" com conversationId "6" com content "Boaaaa" e createdAt "2024-06-16T23:50:04.680Z" e senderId "1"
    And existe uma message de id "21" com conversationId "6" com content "Boa tardeee" e createdAt "2024-06-16T23:51:27.021Z" e senderId "2"
    And existe uma message de id "22" com conversationId "7" com content "Eaaaai Luiiiss" e createdAt "2024-06-17T00:29:27.288Z" e senderId "4"
    And existe uma message de id "23" com conversationId "6" com content "Como voces estao?" e createdAt "2024-06-17T00:29:57.933Z" e senderId "4"

    When uma requisição "GET" for enviada para "/user/4/conversation"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter um array conversas
    And o elemento de index "0" é uma conversa que tem id "7" e name "null" e picture "null" e isGroup "false" e createdAt "2024-06-17T17:04:24.372Z" e favorited "true"
    And o elemento de index "1" é uma conversa que tem id "6" e name "Peneira" e picture "null" e isGroup "true" e createdAt "2024-06-17T17:04:24.338Z" e favorited "false"
    And o elemento de index "2" é uma conversa que tem id "5" e name "null" e picture "null" e isGroup "false" e createdAt "2024-06-17T17:04:24.321Z" e favorited "false"
    