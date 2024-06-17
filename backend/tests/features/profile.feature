Feature: Perfil de usuário
As a usuário do sistema
I want to adicionar informações no meu perfil e ver o perfil de outros usuários
So that eu consigo ver informações de outros usuários e fornecer informações para outros usuários

# Service Scenarios

    Scenario: Edição de nome com sucesso
    Given existe um user com id "2"
    When uma requisição PATCH com um JSON com name "Luisinho" de corpo
    And esta requisição for enviada para "user/2/profile"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter id "2", name "Luisinho", username "lfoc", email "lfoc@cin.ufpe.br", password "luis12345", bio "null" e picture "null"

    Scenario: Edição de email sem sucesso
    Given existe um user com id "2"
    When uma requisição PATCH com um JSON com email "crc@cin.ufpe.br" de corpo
    And esta requisição for enviada para "user/2/profile"
    Then o status da resposta deve ser "400"
    And o JSON deve conter message "Este email já está em uso." e error "Bad Request"

    Scenario: Visualização do próprio perfil
    Given existe um user com id "3"
    When uma requisição GET foi enviada para "user/3/profile"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter id "3", name "Caio", username "crc", bio "null" e picture "null"

    Scenario: Visualização do perfil de um amigo
    Given existe um user com id "2" que quer ver o perfil do seu amigo de id "3"
    When uma requisição GET foi enviada para "user/2/profile/3"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter id "3", name "Caio", username "crc", bio "null" e picture "null"