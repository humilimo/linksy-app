
Feature: Login de usuários
As an usuário da plataforma
I want to acessar a minha conta
So that I can utilizar os recursos da plataforma

SERVICE SCENARIO: Login com credenciais válidas
Given o usuário "paçoca" está cadastrado com username "pacoca@gmail.com"
And "paçoca" está na página “Home” do sistema
When "paçoca" seleciona o elemento "fazer login"
Then "paçoca" é direcionado para página de “login”
When "paçoca" preenche o campo “username” com "pacoca@gmail.com"
And "paçoca" preencho o campo “password” com sua senha
Then "paçoca" recebe uma mensagem de login efetuado com sucesso


SERVICE SCENARIO: Login com senha inválida
Given o usuário "paçoca" está cadastrado com username "pacoca@gmail.com"
And "paçoca" está na página “Login” 
When "paçoca" preenche o campo “username” com "pacoca@gmail.com"
And "paçoca" preencho o campo “password” com sua suposta senha
Then é exibida uma mensagem de senha inválida
And "paçoca" recebe um e-mail de recuperação de senha

GUI SCENARIO: Login com usuário não cadastrado
Given eu não estou cadastrada no sistema
And estou na página de login 
When  preencher o campo username com meu suposto id
And preencher o campo password com a suposta senha
Then recebo uma mensagem de usuário inexistente
And sou direcionada para a página de cadastro

uma alteracao qualquer  1

outra mundanca qualquer  2