Feature delete message

SERVICE SCENARIO: Mensagem excluída para todos(chat em grupo)
Given o grupo "ESS" está na lista de conversas de “paçoca”
And “paçoca” clica em "Editar mensagem" em uma mensagem já enviada por ele
When “paçoca” seleciona “excluir para todos” na mensagem de id "" na coversa de id ""
Then a mensagem é excluída para todos do grupo “ESS”


SERVICE SCENARIO: Mensagem excluída para o autor apenas(chat privado)
Given "biscoito" está na lista de contatos de "paçoca"
And a conversa com “biscoito” está na “lista de conversas” de “paçoca”
And “paçoca” está na página de conversa com “biscoito”
And “paçoca” clica em "Editar mensagem" em uma mensagem já enviada por ele
AND“paçoca” seleciona “excluir” 
AND é exibida uma pergunta para paçoca escolher entre” excluir para si” ou “todos”
WHEN “paçoca” seleciona “excluir para si”
THEN o campo da mensagem é excluído apenas para “paçoca”
And é exibida um campo de mensagem excluída apenas para “pacoca”
