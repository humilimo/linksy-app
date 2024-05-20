# Feature

Feature: Envio de mensagens de texto
As a Usuário
I want to Enviar mensagens de texto para outros usuários
So that Eu possa me comunicar com outras pessoas e grupos

# GUI Scenarios

Scenario: Enviar mensagem de texto numa conversa (individual / grupo)
Given Estou logado como o usuário de username “lfoc”
And Estou na página “Conversa” com os usuários “gvab”, “lbc2”,  “crc” e “slbp”
When Eu digito a mensagem “oiii”
And Clico em "Enviar"
Then A mensagem “oiii” é enviada
And Eu vejo a mensagem “oiii” na página “Conversa”

Scenario: Checar visualização de mensagem por usuários numa conversa (individual / grupo)
Given Estou logado como o usuário de username “lfoc”
And Estou na página “Conversa” com os usuários “gvab”, “lbc2”,  “crc” e “slbp”
And A mensagem “oiii”, enviada por mim, está visível na conversa
When Eu clico em “Dados da mensagem” na mensagem “oiii”
Then Sou redirecionado para a página “Dados da mensagem”
And Eu vejo que o membro “crc” visualizou a mensagem “oiii” no momento “19/05/2024 15:06”
And Eu vejo que o membro “gvab” recebeu a mensagem “oiii” no momento “19/05/2024 13:45”, mas ainda não visualizou a mensagem

Scenario: Tornar uma mensagem editável numa conversa (individual/grupo)
Given Estou logado como o usuário de username “lfoc”
And Estou na página “Conversa” com os usuários “gvab”, “lbc2”,  “crc” e “slbp”
And A mensagem “oiii”, enviada por mim, está visível na conversa
When Eu clico em “Editar mensagem” na mensagem “oiii”
Then A mensagem “oiii” se torna editável

Scenario: Editar mensagens enviadas numa conversa (individual/grupo)
Given Estou logado como o usuário de username “lfoc”
And Estou na página “Conversa” com os usuários “gvab”, “lbc2”,  “crc” e “slbp”
And A mensagem “oiii”, enviada por mim, está visível na conversa
And A mensagem “oii” está editável
When Altero a mensagem “oiii” para “oieee”
And Clico em “Editar”
Then A mensagem deixa de ser editável
And Eu vejo que a mensagem que anteriormente era “oiii”, agora é “oieee”

Service Scenario: Enviar mensagem de texto numa conversa (individual/grupo)
Given O usuário “lfoc” está cadastrado no sistema
And O usuário “gvab” está cadastrado no sistema
When O usuário “lfoc” envia uma mensagem de texto com o conteúdo “oiii” para o usuário “gvab”
Then O sistema armazena a mensagem “oiii”
And O sistema entrega a mensagem “oiii” para o usuário “gvab”

# Service Scenarios

Scenario: Checar visualização de mensagem por usuários numa conversa (individual / grupo)
Given O usuário “lfoc” está logado no sistema
And O usuário “crc” está logado no sistema
And A mensagem “oiii” foi enviada por “lfoc” e está visível para “crc”
When O usuário “lfoc” clica em “Dados da mensagem” na mensagem “oiii”
Then O sistema exibe que o usuário “crc” visualizou a mensagem “oiii” no momento “19/05/2024 15:06”

Scenario: Edição de mensagem numa conversa (individual/grupo)
Given O usuário “lfoc” está cadastrado no sistema
And A mensagem “oiii” foi enviada por “lfoc” e está visível na conversa
When O usuário “lfoc” clica em “Editar mensagem” na mensagem “oiii”
And Altera o conteúdo da mensagem de “oiii” para “oieee”
And Clica em “Salvar”
Then O sistema atualiza a mensagem para “oieee” na conversa