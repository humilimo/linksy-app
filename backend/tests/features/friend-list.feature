Feature: Lista de contatos

    Cenário: Visualizar lista de contatos.
    Given eu estou na página de "Lista de Contatos". 
    And existe um user com id "" e username "lfoc"
    And existe um user com id "" e username "ljat"
    Then vejo uma lista com os usuários “Maria”, “Pedro” e “Tiago”.

    Scenario: Adicionar um contato.
        Given existe um user com id "1" e username "ljat".
        And existe um user com id "2" e username "lfoc".
        When o corpo da requisição é um JSON com username "lfoc".
        And uma requisição "POST" for enviada para "user/1/friend/add".
        Then o status de resposta deve ser "201".
        And o JSON da resposta deve conter requesterId "1".
        And o JSON da resposta deve conter receiverId "2".
    
    Scenario: Excluir um contato.
        Given existe um user com id "1" e username "ljat".
        And existe um user com id "2" e username "lfoc".
        And existe um friend de requesterId "1" e receiverId "2".
        When o corpo da requisição é um JSON com username "lfoc".
        And uma requisição "DELETE" for enviada para "user/1/friend/delete".
        Then o status de resposta deve ser "200".
        And o JSON da resposta deve conter requesterId "1".
        And o JSON da resposta deve conter receiverId "2".
