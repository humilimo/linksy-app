Feature: Encaminhamento de mensagens.
As a usuário do sistema.
I want to encaminhar mensagens previamente enviadas por mim ou por algum dos meus contatos para um ou mais contatos ou um ou mais grupos.
So that eu não precise digitá-las e enviá-las novamente.

Cenário: Encaminhar uma ou mais mensagens de texto e um ou mais arquivos de mídia a um ou mais contatos.
Given eu estou logado como o usuário "João".
And eu tenho o usuário "Tiago" como meu contato.
And eu tenho o usuário "Maria" como meu contato.
And eu tenho o usuário "Pedro" como meu contato.
And estou na página "Conversa" com o usuário "Tiago".
And eu vejo uma mensagem de texto "código da turma" na página "Conversa" com o usuário “Tiago”.
And eu vejo uma mensagem de texto "28139575ABC" na página "Conversa" com o usuário “Tiago”.
And eu vejo um arquivo de mídia "instrucoesDoMonitorParte1.jpeg/mp4/jpg/png/txt/pdf/mp3" na página "Conversa" com o usuário “Tiago”.
And eu vejo um arquivo de mídia "instrucoesDoMonitorParte2.jpeg/mp4/jpg/png/txt/pdf/mp3" na página "Conversa" com o usuário “Tiago”.
When eu seleciono "Encaminhar mensagens".
And seleciono "Marcar" a mensagem de texto "código da turma".
And seleciono "Marcar" a mensagem de texto "28139575ABC".
And seleciono "Marcar" o arquivo de mídia "instrucoesDoMonitorParte1.jpeg/mp4/jpg/png/txt/pdf/mp3".
And seleciono "Marcar" o arquivo de mídia "instrucoesDoMonitorParte2.jpeg/mp4/jpg/png/txt/pdf/mp3".
And seleciono "Encaminhar para".
And seleciono o usuário "Pedro".
And seleciono o usuário”Maria”.
Then a mensagem de texto "código da turma" é encaminhada.
And a mensagem de texto "28139575ABC" é encaminhada.
And o arquivo de mídia "instrucoesDoMonitorParte1.jpeg/mp4/jpg/png/txt/pdf/mp3" é encaminhada.
And o arquivo de mídia "instrucoesDoMonitorParte2.jpeg/mp4/jpg/png/txt/pdf/mp3" é encaminhada.
And eu recebo uma mensagem de confirmação.
And eu vejo a mensagem de texto "código da turma" na página "Conversa" com o usuário "Pedro".
And eu vejo a mensagem de texto "28139575ABC" na página "Conversa" com o usuário "Pedro".
And eu vejo o arquivo de mídia "instrucoesDoMonitorParte1.jpeg/mp4/jpg/png/txt/pdf/mp3" na página "Conversa" com o usuário "Pedro".
And eu vejo o arquivo de mídia "instrucoesDoMonitorParte2.jpeg/mp4/jpg/png/txt/pdf/mp3" na página "Conversa" com o usuário "Pedro".
And eu vejo a mensagem de texto "código da turma" na página "Conversa" com o usuário "Maria".
And eu vejo a mensagem de texto "28139575ABC" na página "Conversa" com o usuário "Maria".
And eu vejo o arquivo de mídia "instrucoesDoMonitorParte1.jpeg/mp4/jpg/png/txt/pdf/mp3" na página "Conversa" com o usuário "Maria".
And eu vejo o arquivo de mídia "instrucoesDoMonitorParte2.jpeg/mp4/jpg/png/txt/pdf/mp3" na página "Conversa" com o usuário "Pedro".

Cenário: Encaminhar uma ou mais mensagens de texto e um ou mais arquivos de mídia a um ou mais grupos.
Given eu estou logado como o usuário "João".
And eu sou participante do grupo “Alunos CIN”.
And eu sou participante do grupo “Alunos EC”.
And eu sou participante do grupo “Alunos ESS”.
And estou na página "Conversa" do grupo “Alunos ESS”.
And eu vejo uma mensagem de texto "código da turma" na página "Conversa” do grupo “Alunos ESS”.
And eu vejo uma mensagem de texto "28139575ABC" na página "Conversa” do grupo “Alunos ESS”.
And eu vejo um arquivo de mídia "instrucoesDoMonitorParte1.jpeg/mp4/jpg/png/txt/pdf/mp3" na página "Conversa” do grupo “Alunos ESS”.
And eu vejo um arquivo de mídia "instrucoesDoMonitorParte2.jpeg/mp4/jpg/png/txt/pdf/mp3" na página "Conversa” do grupo “Alunos ESS”.
When eu seleciono "Encaminhar mensagens".
And seleciono "Marcar" a mensagem de texto "código da turma".
And seleciono "Marcar" a mensagem de texto "28139575ABC".
And seleciono "Marcar" o arquivo de mídia "instrucoesDoMonitorParte1.jpeg/mp4/jpg/png/txt/pdf/mp3".
And seleciono "Marcar" o arquivo de mídia "instrucoesDoMonitorParte2.jpeg/mp4/jpg/png/txt/pdf/mp3".
And seleciono "Encaminhar para".
And seleciono o grupo "Alunos EC".
And seleciono o grupo ”Alunos CIN”.
Then a mensagem de texto "código da turma" é encaminhada.
And a mensagem de texto "28139575ABC" é encaminhada.
And o arquivo de mídia "instrucoesDoMonitorParte1.jpeg/mp4/jpg/png/txt/pdf/mp3" é encaminhada.
And o arquivo de mídia "instrucoesDoMonitorParte2.jpeg/mp4/jpg/png/txt/pdf/mp3" é encaminhada.
And eu recebo uma mensagem de confirmação.
And eu vejo a mensagem de texto "código da turma" na página "Conversa” do grupo “Alunos EC”.
And eu vejo a mensagem de texto "28139575ABC" na página "Conversa” do grupo “Alunos EC”.
And eu vejo o arquivo de mídia "instrucoesDoMonitorParte1.jpeg/mp4/jpg/png/txt/pdf/mp3" na página "Conversa” do grupo “Alunos EC”.
And eu vejo o arquivo de mídia "instrucoesDoMonitorParte2.jpeg/mp4/jpg/png/txt/pdf/mp3" na página "Conversa” do grupo “Alunos EC”.
And eu vejo a mensagem de texto "código da turma" na página "Conversa” do grupo “Alunos CIN”.
And eu vejo a mensagem de texto "28139575ABC" na página "Conversa” do grupo “Alunos CIN”.
And eu vejo o arquivo de mídia "instrucoesDoMonitorParte1.jpeg/mp4/jpg/png/txt/pdf/mp3" na página "Conversa” do grupo “Alunos CIN”.
And eu vejo o arquivo de mídia "instrucoesDoMonitorParte2.jpeg/mp4/jpg/png/txt/pdf/mp3" na página "Conversa” do grupo “Alunos CIN”.
