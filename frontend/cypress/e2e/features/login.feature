Feature: Login de usuário

  Scenario: Login bem-sucedido
    Given eu estou na página de login
    When eu preencho o input de username com "man2"
    And eu preencho o input de password com "mateus12345"
    And eu clico no botão de entrar
    Then eu sou redirecionado para a página de conversas do usuário "Mateus" de id "1"