Feature: Adição de amigos

  Scenario: Adicionar outro usuário como amigo
      Given eu estou logado no usuário de id "1", username "man2" e password "mateus12345"
      And eu estou na página da lista de conversas
      When eu abro o modal da lista de amigos
      And o usuário de nome "Lucas" não está na lista de amigos
      And eu abro o modal de adição de amigos
      And eu preencho o input com o username "ljat"
      And eu clico no botão de adicionar amigo
      Then o usuário de nome "Lucas" deve estar na lista de amigos 

