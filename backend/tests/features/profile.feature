Feature: Perfil de usuário
As a usuário do sistema
I want to adicionar informações no meu perfil e ver o perfil de outros usuários
So that eu consigo ver informações de outros usuários e fornecer informações para outros usuários

# Service Scenarios

    Scenario: Edição de nome com sucesso
    Given existe um user com id "1"
    When uma requisição PATCH com um JSON com name "luisinho" de corpo
    And esta requisição for enviada para "user/1/profile"
    Then o status da resposta deve ser "200"