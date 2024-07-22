Feature: Open Conversation Profile

  Scenario: Abrir Perfil de um Grupo como Dono
    Given o usuário de id "1" está na página da conversa de id "3"
    When o usuário clica no perfil da conversa
    Then a imagem "null" do grupo é exibida na tela
    And o nome do grupo "Grupo com Caio" é exibido na tela
    And há uma opção de editar o nome do grupo
    And a lista de participantes é exibida na tela
    And a lista de participantes contém o usuário de username "man2"
    And o usuário "man2" apresenta uma tag dono
    And a lista de participantes contém o usuário de username "crc"
    And há uma opção de remover o usuário "crc"
    And há uma opção de adicionar novos participantes
    And há um opção de deletar o grupo
  
  Scenario: Abrir Perfil de um Grupo como Membro
    Given o usuário de id "3" está na página da conversa de id "3"
    When o usuário clica no perfil da conversa
    Then a imagem "null" do grupo é exibida na tela
    And o nome do grupo "Grupo com Caio" é exibido na tela
    And a lista de participantes é exibida na tela
    And a lista de participantes contém o usuário de username "man2"
    And o usuário "man2" apresenta uma tag dono
    And a lista de participantes contém o usuário de username "crc"
    And há um opção de sair do grupo

  Scenario: Abrir Perfil de uma Conversa Simples
    Given o usuário de id "2" está na página da conversa de id "2" 
    When o usuário clica no perfil da conversa
    Then a imagem "null" do usuário é exibida na tela
    And o nome "Mateus" do usuário é exibido na tela
    And o username "man2" do usuário é exibido na tela
    And o email "man2@cin.ufpe.br" do usuário é exibido na tela
    And a bio "" do usuário é exibida na tela
    And há um opção de excluir a conversa