Scenario: Visualizar lista de conversas
Given Estou logado como o usuário de username "Biel" 
And Estou na página "Lista de Conversas"
Then Vejo minha Lista de Conversas 

Scenario: Acessar uma conversa
Given Estou logado como o usuário de username "Biel" 
And Estou na página "Lista de Conversas"
When Clico em uma conversa com o usuário "João"
Then Sou redirecionado para a página "Conversa" com o usuário "João"
And Vejo todas as mensagens da conversa com o usuário "João"

Scenario: Iniciar uma nova conversa
Given Estou logado como o usuário de username "Biel" 
And Estou na página "Lista de Conversas"
And  O usuário "João" está na minha "Lista de Amigos"
When Clico em "Iniciar nova conversa"
And  Escolho o usuário "João"
Then Sou redirecionado para a página "Conversa" com o usuário "João"
And Posso enviar uma nova mensagem na conversa com o usuário "João"

Scenario: Favoritar uma conversa
Given Estou logado como o usuário de username "Biel" 
And Estou na página "Lista de Conversas"
When Clico em "Favoritar" uma conversa com o usuário "João"
Then  A conversa com o usuário "João" é colocada na lista de favoritos
And Vejo a conversa com o usuário "João" destacada no topo da minha lista de conversas

Scenario: Desfavoritar uma conversa
Given Estou logado como o usuário de username "Biel" 
And Estou na página "Lista de Conversas"
When Clico em "Desfavoritar" uma conversa com o usuário "João"
Then  A conversa com o usuário "João" é retirada da lista de favoritos
And Vejo que a conversa com o usuário "João" perdeu seu destaque no topo da minha lista de conversas

Scenario: Apagar uma conversa
Given Estou logado como o usuário de username "Biel" 
And Estou na página "Lista de Conversas"
And Tem uma conversa com o usuário "João" que eu quero apagar
When Clico em "Excluir conversa"
Then Recebo uma mensagem de confirmação para confirmar essa ação
And Após eu confirmar, não vejo mais a conversa com "João" na minha lista de conversas
    
Scenario: Limpar lista de conversas
Given Estou logado como o usuário de username "Biel"
And Estou na página "Lista Conversas"
When Clico em "Limpar lista de conversas"
Then Recebo uma mensagem de confirmação para confirmar essa ação
And Após confirmar, vejo minha lista de conversas vazia
	
    
# Service Scenario

Scenario: Apagar conversas da lista de conversas de usuários que não tiveram interação por 90 dias
Given "Biel" e "Luis" são usuários do sistema
And O sistema verifica periodicamente se a data de última interação nas conversas de seus usuários está dentro de "90 dias"
And O usuário "Biel" tem um conversa com o usuário "Luis" que está sem interações há "97" dias.
When O sistema identificar que a conversa entre o usuário "Biel" com o usuário "Luis" não está dentro do critério de permanência
Then A a conversa entre o usuário "Biel" com o usuário "Luis" será removida da lista de conversas do sistema.
And O sistema atualiza a lista de conversas do usuário "Biel" e do usuário "Luis" 


Scenario: Favoritar uma conversa
Given "Biel" e "Luis" são usuários do sistema
And O usuário "Biel" tem uma conversa recente com o usuário "Luis"
When O usuário "Biel" seleciona "Favoritar" a conversa com o usuário "Luis" .
Then A conversa do usuário "Biel" com o usuário "Luis"  é destacada
And O sistema atualiza a lista de conversas do usuário "Biel" para que ele possa ver sua conversa com "Luis" no topo da lista