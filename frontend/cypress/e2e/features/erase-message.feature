Feature: apagar mensagem para todos

  Scenario: apagar mensagem para todos em uma conversa
    Given estou logado no usuário de username "mms11", password "mariana12345" e id "5"
    And estou na lista de conversas
    When seleciono a página da conversa de id "9"
    And existe a mensagem "oi" na conversa
    When eu clico no ícone de lixeira ao lado da mensagem "oi" de id "40"
    And clico no botão apagar para todos
    Then a mensagem "oi" é apagada da página da conversa




