Feature: Pesquisa de amigos

  Scenario: Buscando um amigo
      Given eu estou logado no usuário de id "1", username "man2" e password "mateus12345"
      And eu estou na página da lista de conversas
      When eu abro o modal da lista de amigos
      And o usuário de nome "Lucas" está na lista de amigos
      And eu preencho o input de pesquisa com o username "ljat"
      Then o usuário de nome "Lucas" se torna o único na listagem