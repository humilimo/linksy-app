Feature: Adição de amigos 

Scenario: Tentativa de adição de um usuário que já listado como amigo
      Given eu estou logado no usuário de id "1", username "man2" e password "mateus12345"
      And eu estou na pagina da lista de conversas
      When eu abro o modal da lista de amigos
      And o usuário de nome "Luis" está na lista de amigos
      And eu abro o modal de adição de amigos
      And eu preencho o input com o username "lfoc"
      And eu clico no botão de adicionar amigo
      Then uma mensagem de erro "LFOC já está na sua lista de amigos" é exibida
          