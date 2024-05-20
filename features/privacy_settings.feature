Feature: Configurações de privacidade
As a usuário do sistema
I want to modificar configurações de privacidade
So that eu posso gerenciar quais informações minhas podem ser vistas por outros usuários

#Cenário de GUI
Scenario: Não permitir que outros usuários vejam quando entrei por último
Given estou logado com o usuário "alice"
And estou na página "configurações"
When eu seleciono a opção "visto por último"
And altero para "ninguém"
Then o usuário "bob" não pode visualizar o horário do último acesso de "alice"

Scenario: Permitir que apenas os contatos vejam quando entrei por último
Given estou logado com o usuário "alice"
And "alice" não tem o usuário "bob" na lista de contatos
And estou na página "configurações"
When eu seleciono a opção "visto por último"
And altero para "apenas contatos"
Then o usuário "bob" não pode visualizar o horário do último acesso de "alice"

Scenario: Permitir visualização de foto do perfil para todos
Given estou logado com o usuário "alice"
And estou na página "configurações"
When eu seleciono a opção "visibilidade da foto de perfil"
And altero para "todos"
Then o usuário "bob" pode visualizar a foto de perfil do usuário "alice"

Scenario: Permitir visualização de foto do perfil apenas para contatos
Given estou logado com o usuário "alice"
And "alice" tem o usuário "bob" na lista de contatos
And estou na página "configurações"
When eu seleciono a opção "visibilidade da foto de perfil"
And altero para "meus contatos"
Then o usuário "bob" pode visualizar a foto de perfil do usuário "alice"

Scenario: Tentativa de receber uma mensagem enviada por um contato bloqueado
Given estou logado com o usuário "alice"
And "alice" tem o usuário "bob" na lista de contatos bloqueados
When "bob" envia uma mensagem para "alice"
Then o usuário "alice" não recebeu novas mensagens de "bob"


Scenario: Ver lista de contatos bloqueados
Given estou logado com o usuário "alice"
And "alice" tem o usuário "bob" na lista de contatos bloqueados
And estou na página "configurações de privacidade"
When clico em "lista de contatos bloqueados"
Then a lista de contatos bloqueados é mostrada com o usuário "bob"

Scenario: Adicionar contato a lista de contatos bloqueados
Given estou logado com o usuário "alice"
And "alice" tem o usuário "bob" na lista de contatos
And estou na página "Perfil do usuário" do usuário "bob"
When clico em "bloquear contato" e confirmo
Then uma mensagem é mostrada confirmando que o usuário foi bloqueado


#Cenário de Serviço
Scenario: Tentativa de envio de mensagens por um usuário bloqueado
Given "alice" tem o usuário "bob" na lista de contatos bloqueados
When "bob" tenta enviar uma mensagem para "alice"
Then o sistema não permite que a mensagem seja enviada

Scenario: Foto de perfil compartilhada apenas com contatos
Given "alice" não tem o usuário "bob" na lista de contatos
When "bob" abre o perfil de "alice"
Then o sistema não mostra a foto de perfil para "bob"
And uma imagem padrão é mostrada no lugar