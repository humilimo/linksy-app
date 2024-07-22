Feature: Create Conversation

  Scenario: Criar um novo grupo
    Given o usuário está logado com o usuário de id "1", username "man2" e senha "mateus12345"
    And o usuário está na página da lista de conversas
    And existem "0" grupos de nome "Novo Grupo com Caio e Luis" aparecendo na lista de conversas do usuário
    When o usuário clica em Nova Conversa
    And o usuário clica em Novo Grupo
    And o usuário preenche o nome do grupo com "Novo Grupo com Caio e Luis"
    And o usuário seleciona da lista de amigos o usuário de username "crc"
    And o usuário seleciona da lista de amigos o usuário de username "lfoc"
    And o usuário clica em Criar
    Then o usuário deve estar na pagina da conversa criada de id "10"
    And devem existir "1" grupos de nome "Novo Grupo com Caio e Luis" na lista de conversas do usuário

	Scenario: Criar uma nova conversa
    Given o usuário está logado com o usuário de id "1", username "man2" e senha "mateus12345"
    And o usuário está na página da lista de conversas
    And a conversa com o usuário de username "crc" não está aparecendo na lista de conversas do usuário
    When o usuário clica em Nova Conversa
    And o usuário clica no usuário de username "crc" da lista de amigos
    Then o usuário deve estar na pagina da conversa criada de id "11"

	Scenario: Retornar para uma conversa já existente
    Given o usuário está logado com o usuário de id "1", username "man2" e senha "mateus12345"
    And o usuário está na página da lista de conversas
    And a conversa com o usuário de username "lfoc" não está aparecendo na lista de conversas do usuário
    When o usuário clica em Nova Conversa
    And o usuário clica no usuário de username "lfoc" da lista de amigos
    Then o usuário deve estar na pagina da conversa de id "2" ao qual ele retornou