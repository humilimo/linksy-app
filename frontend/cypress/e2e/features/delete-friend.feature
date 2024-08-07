Feature: Exclusão de amigos

  Scenario: Excluir um usuário da lista de amigos
      Given eu estou logado no usuário de id "1", username "man2" e password "mateus12345"
      And eu estou na página da lista de conversas
      When eu abro o modal da lista de amigos
      And o usuário de nome "Lucas" está na lista de amigos
      And eu clico no ícone de lixeira ao lado das informações do usuário "Lucas"
      Then o usuário de nome "Lucas" não deve estar mais listado como amigo 
