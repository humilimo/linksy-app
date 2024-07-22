Feature: Conversation List

  Scenario: Lista de conversas recentes
    Given estou logado no usuário de username "gvab" e senha "gabriel12345"
    And o usuário de id "4" está na página da lista de conversas
    And a conversa com o usuário de username "lfoc" deve existir na lista de conversas do usuário
    And o grupo de nome "Peneira" deve existir na lista de conversas do usuário
    And a conversa com o usuário de username "man2" deve existir na lista de conversas do usuário
    When o usuário clicar na conversa de id "7"
    Then o usuário deve ser redirecionado para a página da conversa de id "7"

   Scenario: Favoritar uma conversa
    Given estou logado no usuário de username "gvab" e senha "gabriel12345"
    Given o usuário de id "4" está na página da lista de conversas
    And a conversa com o usuário de username "lfoc" deve existir na lista de conversas do usuário
    And a conversa de id "7" não está favoritada
    When o usuário clicar na estrela ao lado da conversa de id "7"
    Then a conversa de id "7" deve ser marcada como favorita

  Scenario: Desfavoritar uma conversa
    Given estou logado no usuário de username "gvab" e senha "gabriel12345"
    Given o usuário de id "4" está na página da lista de conversas
    And a conversa com o usuário de username "lfoc" deve existir na lista de conversas do usuário
    And a conversa de id "7" está favoritada
    When o usuário clicar na estrela ao lado da conversa de id "7"
    Then a conversa de id "7" não deve está mais marcada como favorita