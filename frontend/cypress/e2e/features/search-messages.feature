Feature: Pesquisar Mensagem em Conversas

  Scenario: Pesquisar mensagem em uma única conversa
    Given estou logado no usuário de username "gvab" e senha "gabriel12345"
    And o usuário de id "4" está na página da conversa de id "6"
    And a conversa de id "6" contém as mensagens "Boa tarde grupo!", "Boaaaa" , "Boa tardeee" e "Como voces estao?"
    When o usuário pesquisar por "Boa" na conversa de id "6"
    Then o resultado da pesquisa deve incluir as mensagens "Boa tardeee", "Boaaaa" e "Boa tarde grupo!"

   Scenario: Pesquisar mensagem em todas as conversas
    Given estou logado no usuário de username "gvab" e senha "gabriel12345"
    And o usuário de id "4" está na página da lista de conversas
    And a conversa de id "6" contém as mensagens "Boa tarde grupo!", "Boaaaa" , "Boa tardeee" e "Como voces estao?"
    And a conversa de id "5" contém as mensagens "Boa tarde Mateus!" e "Boa, tudo bom com voce gabriel?"
    When o usuário pesquisar por "Boa" em todas as conversas
    Then o resultado da pesquisa deve incluir as mensagens "Boa tardeee", "Boaaaa" , "Boa tarde grupo!" , "Boa tarde Mateus!" e "Boa, tudo bom com voce gabriel?"