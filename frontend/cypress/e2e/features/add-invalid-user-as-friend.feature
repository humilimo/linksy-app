Feature: Adição de amigos

Scenario: Tentativa de adição de um usuário não cadastrado
      Given eu estou logado no usuário de id "1", username "man2" e password "mateus12345"
      And eu estou na pagina da lista de conversas
      When eu abro o modal da lista de amigos
      And eu abro o modal de adição de amigos
      And eu preencho o input com o username "lj"
      And eu clico no botão de adicionar amigo
      Then uma mensagem de erro "Usuário inválido" é exibida
          