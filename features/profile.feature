Feature: Perfil de usuário
As a usuário do sistema
I want to adicionar informações no meu perfil e ver o perfil de outros usuários
So that eu consigo ver informações de outros usuários e fornecer informações para outros usuários

Scenario: Abrir perfil
Given estou na página “Lista de conversas”
When eu clico em “perfil”
Then sou redirecionado para a página “perfil”
And eu vejo meu “nome”, minha “bio”, meu “número”, minha “foto” e minha “idade”

Scenario: Editar perfil
Given estou na página “perfil” 
When eu clico em “Editar perfil”
And eu escrevo “iOS developer” na “bio”
And eu clico em salvar
Then meu perfil foi atualizado
