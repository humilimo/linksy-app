Feature: delete message

Scenario: Mensagem excluída para todos(chat em grupo)
  Given o grupo grupoMari de id "9" está na lista de conversa de Mari de id "5"
  And o grupoMari de id "9" está na lista de conversa de Lucas de id "6"
  When Mari de id "5" seleciona “excluir para todos” na mensagem de id "29" na coversa de id "9"
  Then a mensagem de id "29" é excluída para todos do grupo grupoMari



Scenario: Mensagem excluída para o usuario apenas
  Given o grupo grupoMari de id "9" está na lista de conversa de Mari de id "5"
  And o grupoMari de id "9" está na lista de conversa de Lucas de id "6"
  When Mari de id "5" seleciona “excluir para mim” na mensagem de id "27" na coversa de id "9"
  Then a mensagem de id "27" é excluída para Mari de id "5" no grupoMari de id "9"
  And a mensagem de id "27" é mantida para Lucas de id "6" no grupoMari de id "9"