Feature: Lista de contatos

    Scenario: Adicionar um usuário válido como contato
        Given existe um user com id "6" e username "ljat"
        And existe um user com id "4" e username "gvab"
        When o corpo da requisição é um JSON com username "gvab"
        And uma requisição "POST" for enviada para "/user/6/friend/add"
        Then o status da resposta deve ser "201"
        And o JSON da resposta deve conter requesterId "6"
        And o JSON da resposta deve conter receiverId "4"

    Scenario: Adicionar como contato um usuário inválido
        Given existe um user com id "6" e username "ljat"
        And não existe um user com username "lj"
        When o corpo da requisição é um JSON com username "lj"
        And uma requisição "POST" for enviada para "/user/6/friend/add"
        Then o status da resposta deve ser "401"
        And o JSON da resposta deve conter message "Usuário inválido."
    
    Scenario: Excluir um contato
        Given existe um user com id "6" e username "ljat"
        And existe um user com id "3" e username "crc"
        And existe um friend de requesterId "6" e receiverId "3"
        When o corpo da requisição é um JSON com username "crc"
        And uma requisição "DELETE" for enviada para "/user/6/friend/delete"
        Then o status da resposta deve ser "200"
        And o JSON da resposta deve conter requesterId "6"
        And o JSON da resposta deve conter receiverId "3"

    Scenario: Visualizar lista de contatos
        Given existe um user com id "6" e username "ljat"
        And existe um user com id "2" e username "lfoc"
        And existe um user com id "1" e username "man2"
        And existe um friend de requesterId "6" e receiverId "2"
        And existe um friend de requesterId "6" e receiverId "1"
        When uma requisição "GET" for enviada para "/user/6/friend/all"
        Then o status da resposta deve ser "200"
        And o JSON da resposta deve conter o array de objetos friendList
        And o array friendList deve conter o objeto {id: "2", username: "lfoc", name: "Luis", bio: "null", picture: "null"}
        And o array friendList deve conter o objeto {id: "1", username: "man2", name: "Mateus", bio: "null", picture: "null"}


     