Feature: Lista de contatos
As a usuário do sistema.
I want to ver uma lista dos meus contatos.
So that eu possa contatar usuários relevantes para mim mais facilmente.

Cenário: Visualizar lista de contatos.
Given eu estou na página de "Lista de Contatos". 
And estou logado como o usuário "João".
Then vejo uma lista com os meus contatos previamente adicionados. (preciso detalhar mais)

Cenário: Visualizar um contato.
Given eu estou logado como o usuário "João".
And eu tenho o usuário "Pedro" como meu contato.
And estou na página de "Perfil de Usuário" de "Pedro".
Then eu posso ver as informações de contato de "Pedro" (falta algo aqui).  
 
Cenário: Excluir um contato.
Given eu estou logado como o usuário "João".
And eu tenho o usuário "Pedro" como meu contato.
And estou na página de "Perfil de Usuário" de "Pedro".
When eu seleciono "Excluir contato".
Then o usuário "Pedro" é removido da minha "Lista de Contatos". 
And uma mensagem do sistema é mostrada confirmando que o usuário foi excluído da minha lista de contatos.
And eu não vejo mais o usuário "Pedro" na minha "Lista de Contatos".
