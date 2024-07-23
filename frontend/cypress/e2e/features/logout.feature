Feature: Login de usuário

 Scenario: Logout
    Given eu estou logado no usuário de id "1", username "man2" e password "mateus12345"
    And eu estou na pagina da lista de conversas
    And eu clico no botão de logout
    Then eu sou redirecionado para a página de login