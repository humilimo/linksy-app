Feature: Lista de contatos
As a usuário do sistema.
I want to ver uma lista dos meus contatos.
So that eu possa contatar usuários relevantes para mim mais facilmente.

Cenário: Visualizar lista de contatos.
Given eu estou na página de "Lista de Contatos". 
And estou logado como o usuário "João".
And eu tenho o usuário "Tiago" como meu contato.
And eu tenho o usuário "Maria" como meu contato.
And eu tenho o usuário "Pedro" como meu contato.
Then vejo uma lista com os usuários “Maria”, “Pedro” e “Tiago”.

Cenário: Visualizar um contato.
Given eu estou logado como o usuário "João".
And o usuário “Pedro” está cadastrado no sistema com o email “pedro@email.com”.
And o usuário “Pedro” possui uma foto de perfil.
And o usuário “Pedro” tem “disponível” como bio.
And eu tenho o usuário "Pedro" como meu contato com o apelido “Peu”.
And estou na página de "Perfil de Usuário" de "Pedro".
Then eu posso ver o nome, apelido, foto de perfil, bio e email do usuário “Pedro”.

Cenário: Adicionar um contato.
Given eu estou logado como o usuário "João".
And eu estou na página de "Lista de Contatos".
And o usuário “Pedro” está cadastrado no sistema com o email “pedro@email.com”.
And o usuário “Pedro” não é um dos meus contatos.
When eu seleciono “Adicionar contato”.
And tento adicionar o usuário “Pedro” pelo email “pedro@gmail.com”.
Then eu posso ver uma mensagem de confirmação.
And eu vejo que o usuário “Pedro” agora está na minha lista de contatos. 

Cenário: Editar um contato.
Given eu estou logado como o usuário "João".
And eu tenho o usuário "Lucas" como meu contato com o apelido “Lucass”.
And estou na página "Conversa" com o usuário "Lucas".
When eu seleciono “Mudar apelido para”. 
And tento atualizar o apelido de “Lucass” para “Lucas”.
Then eu posso ver uma mensagem de confirmação.
And eu vejo que o apelido do usuário “Lucas” agora é “Lucas”
 
Cenário: Excluir um contato.
Given eu estou logado como o usuário "João".
And eu tenho o usuário "Pedro" como meu contato.
And estou na página de "Perfil de Usuário" de "Pedro".
When eu seleciono "Excluir contato".
Then o usuário "Pedro" é removido da minha "Lista de Contatos". 
And eu posso ver uma mensagem de confirmação.
And eu não vejo mais o usuário "Pedro" na minha "Lista de Contatos".
