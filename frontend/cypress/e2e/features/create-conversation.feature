Feature: Create Conversation

  Scenario: Criar um novo grupo
    Given o usuário de id "1" está na página da lista de conversas
    And o grupo de nome "Novo Grupo com Caio e Luis" não deve estar aparecendo na lista de conversas do usuário
    When o usuário clica em Novo Grupo
    And o usuário preenche o nome do grupo com "Novo Grupo com Caio e Luis"
    And o usuário seleciona da lista de amigos o usuário de username "crc"
    And o usuário seleciona da lista de amigos o usuário de username "lfoc"
    And o usuário clica em Criar
    # Then o usuário deve estar na pagina da conversa criada
    And o grupo de nome "Novo Grupo com Caio e Luis" deve estar aparecendo na lista de conversas do usuário

	Scenario: Criar uma nova conversa
    Given o usuário de id "1" está na página da lista de conversas
    And a conversa com o usuário de username "crc" não deve existir na lista de conversas do usuário
    When o usuário clica em Nova Conversa
    And o usuário clica no usuário de username "crc" da lista de amigos
  #   Then o usuário deve estar na pagina da conversa criada

	Scenario: Retornar para uma conversa já existente
    Given o usuário de id "1" está na página da lista de conversas
    And a conversa com o usuário de username "lfoc" não deve existir na lista de conversas do usuário
    When o usuário clica em Nova Conversa
    And o usuário clica no usuário de username "lfoc" da lista de amigos
    # Then o usuário deve estar na pagina da conversa criada
    Then a conversa com o usuário de username "lfoc" deve existir na lista de conversas do usuário
