Feature: Login de usuário

  Scenario: Tentativa de login com credencias inválidas
    Given eu estou na página de login
    When eu preencho o input de username com "man2" 
    When eu preencho o input de password com "mateus1234"
    And eu clico no botão de entrar
    Then uma mensagem de erro "Credenciais inválidas, tente novamente." é exibida