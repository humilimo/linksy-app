Feature: Exclusão de mensagens
As an usuário da plataforma
I want to utilizar as opções de editar mensagem
So that I can excluir mensagens enviadas por mim

SERVICE SCENARIO: Mensagem excluída para o autor apenas(chat em grupo)
Given o grupo "ESS" está na “lista de conversas” de “paçoca”
And “paçoca” está na “página de conversa” do grupo “ESS”
And “paçoca” clica em "Editar mensagem" em uma mensagem já enviada por ele
When “paçoca” seleciona excluir 
Then é exibida  pergunta para “paçoca” escolher entre “excluir para si ou “todos”
And “paçoca” seleciona “excluir para si”
And o campo da mensagem é excluído para “paçoca”
And é exibida um campo de mensagem excluída para “paçoca”




SERVICE SCENARIO: Mensagem excluída para todos(chat em grupo)
Given o grupo "ESS" está na lista de conversas de “paçoca”
And “paçoca” está na página de conversa do grupo “ESS”
And “paçoca” clica em "Editar mensagem" em uma mensagem já enviada por ele
When “paçoca” seleciona “excluir” 
Then é exibida  pergunta para “paçoca” escolher entre “excluir para si” ou “todos”
And paçoca seleciona “excluir para todos” 
And o campo da mensagem é excluído para todos do grupo “ESS”
And é exibido um campo de mensagem excluída para todos do grupo “ESS”

SERVICE SCENARIO: Mensagem excluída para o autor apenas(chat privado)
Given "biscoito" está na lista de contatos de "paçoca"
And a conversa com “biscoito” está na “lista de conversas” de “paçoca”
And “paçoca” está na página de conversa com “biscoito”
And “paçoca” clica em "Editar mensagem" em uma mensagem já enviada por ele
When “paçoca” seleciona “excluir” 
Then é exibida uma pergunta para paçoca escolher entre” excluir para si” ou “todos”
And “paçoca” seleciona “excluir para si”
And o campo da mensagem é excluído apenas para “paçoca”
And é exibida um campo de mensagem excluída apenas para “pacoca”



GUI SCENARIO: Mensagem excluída para todos(chat privado)
Given "biscoito" está na minha lista de contatos
And a conversa com biscoito está na minha lista de conversas
And Estou página de conversa com biscoito
And  clico em "Editar mensagem" em uma mensagem já enviada por mim
When  seleciono a opção excluir 
Then é exibida uma pergunta para que eu escolha entre excluir para mim ou todos
And eu seleciono excluir para todos
And o campo da mensagem é excluído para mim e para biscoito
And é exibida um campo de mensagem excluída para mim e para biscoito



