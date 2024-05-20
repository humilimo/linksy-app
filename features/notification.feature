Feature: Notificações de mensagens
As a usuário do sistema
I want to receber notificações de novas mensagens
So that eu posso me lembrar de ler novas mensagens

#Cenário de GUI
Scenario: Recebimento de nova mensagem
Given estou logado com o usuário "alice"
And estou na página "Lista de conversas"
When "bob" envia uma mensagem para "alice"
Then é emitido um sinal sonoro indicando o recebimento de uma nova mensagem
And a conversa com "bob" está destacada

#Cenário de Serviço
Scenario: Recebimento de nova mensagem
Given "bob" não está bloqueado por "alice"
When "bob" envia uma mensagem para "alice"
Then é emitido um sinal de notificação para "alice"