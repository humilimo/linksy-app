Feature: Pesquisa em Conversas
As a Usuário
I want to Pesquisar alguma mensagem de texto que enviei ou recebi dentro do sistema
So that Encontrar a mensagem de texto que estou procurando

Scenario: Pesquisar uma mensagem de texto em uma única conversa
    Given existe um user com id "4" e username "gvab"
    And existe um user com id "1" e username "man2"

    And existe uma conversation com id "5" com isGroup "false" e name "null"

    And existe uma userConversation com userId "4" e conversationId "5" e leftConversation "false" e favorited "false"
    And existe uma userConversation com userId "1" e conversationId "5" e leftConversation "false" e favorited "false"

    And existe uma message de id "17" com conversationId "5" com content "Boa tarde Mateus!" e createdAt "2024-06-16T23:40:24.421Z" e senderId "4" 
    And existe uma message de id "18" com conversationId "5" com content "Boa, tudo bom com voce gabriel?" e createdAt "2024-06-16T23:40:47.428Z" e senderId "1"
    
    When uma requisição "GET" for enviada para "/user/4/conversation/5/search" sendo o corpo da requisição um JSON com targetWord "Boa Tarde"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter content "Boa tarde Mateus!" createdAt "2024-06-16T23:40:24.421Z" senderId "4"

Scenario: Pesquisar uma mensagem de texto em todas as conversas
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
    
    When uma requisição "GET" for enviada para "/user/4/conversation/search" sendo o corpo da requisição um JSON com targetWord "Boa Tarde"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter um array mensagens
    And o elemento de index "0" é uma mensagem que tem content "Boa tardeee" e createdAt "2024-06-16T23:51:27.021Z" e conversationId "6" e senderId "2" 
    And o elemento de index "1" é uma mensagem que tem content "Boa tarde grupo!" e createdAt "2024-06-16T23:49:00.321Z" e conversationId "6" e senderId "4" 
    And o elemento de index "2" é uma mensagem que tem content "Boa tarde Mateus!" e createdAt "2024-06-16T23:40:24.421Z" e conversationId "5" e senderId "4" 
