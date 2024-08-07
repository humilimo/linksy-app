Feature: Delete Group

  Scenario: Dono do Grupo Tenta Deletar Completamente o Grupo Mas Escreve o Nome do Grupo Errado
    Given o usuário está logado com o usuário de id "1", username "man2" e senha "mateus12345"
    And a conversa de id "1" e de nome "Projeto ESS - Grupo 6" está aparecendo na lista de conversas do usuário
    And o usuário está na página da conversa de id "1" 
    When o usuário clica no perfil da conversa
    And o usuário clica em Deletar Grupo
    And o usuário digita "Projeto ESS"
    And o usuário confirma a deleção do grupo
    Then o usuário deve estar na mesma página
    And o perfil da conversa ainda deve estar aberto
    And a confirmação de deletar o grupo ainda deve estar na tela
    And a mensagem de nome do grupo errado deve estar na tela
    And o grupo de id "1" e de nome "Projeto ESS - Grupo 6" ainda deve estar aparecendo na lista de conversas do usuário

  Scenario: Dono do Grupo Deleta Completamente o Grupo
    Given o usuário está logado com o usuário de id "1", username "man2" e senha "mateus12345"
    And a conversa de id "1" e de nome "Projeto ESS - Grupo 6" está aparecendo na lista de conversas do usuário
    And o usuário está na página da conversa de id "1" 
    When o usuário clica no perfil da conversa
    And o usuário clica em Deletar Grupo
    And o usuário digita "Projeto ESS - Grupo 6"
    And o usuário confirma a deleção do grupo
    Then o usuário deve estar na pagina inicial
    And o grupo de id "1" e de nome "Projeto ESS - Grupo 6" não deve estar aparecendo