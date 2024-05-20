Feature: Cadastro de Usuários
As a usuário do sistema
I want to cadastrar uma conta com meus dados no sistema 
So that eu posso me comunicar com outros usuários

GUI Scenario: Cadastro com sucesso
Given estou na página "Cadastro",
When Eu preencho o “nome” com “Luan Coelho”, o “e-mail” com “luan@email.com”, o “senha” com “^j6KpoUJKm@ZDX$733bd”, o “número de telefone” com “(11) 91111-1111” e o “CPF” com “111.111.111-11”,
And Eu clico em "Cadastrar",
Then uma mensagem pedindo para que eu confirme meu cadastro no meu e-mail “luan@email.com” aparece
And Eu confirmo o cadastro no e-mail
And Sou redirecionado para a página “inicio” 

GUI Scenario: Cadastro com falha
Given estou na página “Cadastro”
When Eu preencho o “nome” com “Luan Coelho”, o “e-mail” com “luan@email.com”, o “senha” com “luan123”, o “número de telefone” com “(11) 91111-1111” e o “CPF” com “111.111.111-1”,
And Eu clico em "Cadastrar",
Then eu vejo a mensagem “Sua senha possui menos que 8 caracteres”,
And meu cadastro não é realizado .

GUI Scenario: Cadastro incompleto
Given estou na página “Cadastro”
When eu preencho o “nome” com “Luan Coelho”, o “e-mail” com “luan@email.com”, o “senha” com “luan123”, o “número de telefone” com “(11) 91111-1111”,
And eu deixo “CPF” sem preencher
And eu clico em "Cadastrar",
Then eu vejo a mensagem “Você precisa preencher todos os campos para realizar cadastro”,
And meu cadastro não é realizado.
