Feature: Pesquisa em Conversas
As a Usuário
I want to Pesquisar alguma mensagem de texto que enviei ou recebi dentro do sistema
So that Encontrar a mensagem de texto que estou procurando

Scenario:Pesquisar uma mensagem de texto que não foi enviada em nenhuma conversa globalmente
Given Estou logado como o usuário de username "Biel"
And Estou na página "Lista de Conversas"
And A palavra-chave "Target"  não está presente em nenhuma mensagem de texto da "Lista de Mensagens de texto Global"
When Clico em "Pesquisar"
And Digito a palavra-chave "Target"
Then Recebo uma mensagem de erro

Scenario:Pesquisar uma mensagem de texto que não foi enviada em uma conversa específica
Given Estou logado como o usuário de username "Biel"
And Estou na página "Conversa" com o usuário "João"
And A palavra-chave "Target"  não está presente em nenhuma mensagem de texto  da "Lista de Mensagens de texto da Conversa"
When Clico em "Pesquisar"
And Digito a palavra-chave "Target"
Then Recebo uma mensagem de erro

Scenario:Pesquisar uma mensagem de texto que foi enviada globalmente
Given Estou logado como o usuário de username "Biel"
And Estou na página "Lista de Conversas"
And A palavra-chave "Target" está presente em alguma mensagem de texto da "Lista de Mensagens de texto Global"
When Clico em "Pesquisar"
And Digito a palavra-chave "Target"
Then Sou redirecionado para a página "Lista de Resultados de Pesquisa" 

Scenario:Selecionar uma mensagem de texto através de uma pesquisa em todas as conversas 
Given Estou logado como o usuário de username "Biel"
And Estou na página "Lista de Resultados de Pesquisa"
And Estou buscando mensagens de texto compostas pela palavra-chave "Target" em todas as conversas
And Vejo conversas com os usuários "João" ,"Pedro" e com o grupo "ESS-Projeto", nas quais as mensagens "Target1", "Target2", "Target3" foram enviadas, respectivamente.
When Eu clico na mensagem "Target1" 
Then Sou redirecionado para a página "Conversa" com o usuário "João" 
And Sou direcionado para onde a mensagem "Target1" foi enviada na conversa com o usuário "João"

Scenario: Pesquisar uma mensagem de texto em uma conversa específica 
Given Estou logado como o usuário de username "Biel"
And Estou na página "Conversa" com o usuário "João"
And A palavra-chave "Target" está presente em alguma mensagem de texto da "Lista de Mensagens de texto da Conversa"
When Clico em "Pesquisar"
And Digito a palavra-chave "Target"
Then Sou redirecionado para a página "Lista de Resultados de Pesquisa"

Scenario: Selecionar uma mensagem de texto através de uma pesquisa em uma conversa específica
Given Estou logado como o usuário de username "Biel"
And Estou na página "Lista de Resultados de Pesquisa"
And Estou buscando mensagens de texto compostas pela palavra-chave "Target"
na conversa com o usuário "João"
And Vejo as mensagens de texto "Target1", "Target2", "Target3"
When Clico na mensagem de texto "Target1"
Then Sou redirecionado para página "Conversa" com o usuário "João"
And Sou direcionado para onde mensagem a "Target1" foi enviada na conversa com o usuário "João"

Scenario: Filtrar resultados de pesquisa global por data
Given Estou logado como o usuário de username "Biel"
And Estou na página "Lista de Resultados de Pesquisa"
And Estou buscando mensagens de texto compostas pela palavra-chave "Target"
em todas as conversas
And Vejo a mensagem "Target1" , que foi enviada na conversa com o usuário "João" na Data "23/06/2003"
And Vejo a mensagem "Target2" , que foi enviada na conversa com o usuário
"Neves" na Data "23/03/2003"
When Clico em "Filtrar por Data"
And  Escrevo a data "23/06/2003"
Then Vejo a lista de resultados da minha pesquisa ser atualizada
And Vejo apenas a mensagem "Target1" na lista de resultados agora

Scenario: Filtrar resultados de pesquisa global por remetente
Given Estou logado como o usuário de username "Biel"
And Estou na página "Lista de Resultados de Pesquisa"
And Estou buscando mensagens de texto compostas pela palavra-chave "Target" em todas as conversas
And Vejo a mensagem "Target1", que foi enviada na conversa com o usuário "João"
And Vejo a mensagem "Target2", que foi enviada na conversa com o usuário "man"
When Clico em "Filtrar por remetente"
And  Escrevo o remetente "man"
Then Vejo a lista de resultados da minha pesquisa ser atualizada
And Vejo apenas a mensagem "Target2" na lista de resultados agora

Scenario: Filtrar resultados de pesquisa global por remetente e data
Given Estou logado como o usuário de username "Biel"
And Estou na página "Lista de Resultados de Pesquisa"
And Estou buscando mensagens de texto compostas pela palavra-chave "Target" em todas as conversas
And Vejo a mensagem "Target1", que foi enviada na conversa com o usuário "João"
na Data "23/06/2003"
And Vejo a mensagem "Target2", que foi enviada na conversa com o usuário "man"
na Data "24/03/2003"
When Clico em "Filtrar por Data e Remetente"
And  Escrevo o remetente "man" e data "24/03/2003"
Then Vejo a lista de resultados da minha pesquisa ser atualizada
And Vejo apenas a mensagem "Target2" na lista de resultados agora

Scenario: Filtrar resultados de pesquisa em uma conversa específica
Given Estou logado como o usuário de username "Biel"
And Estou na página "Lista de Resultados de Pesquisa"
And Estou buscando mensagens de texto compostas pela palavra-chave "Target" na conversa com o usuário "João"
And Vejo a mensagem "Target1" ,que foi enviada na Data "23/06/2003"
And Vejo a mensagem "Target2" , que foi enviada na Data "23/03/2003"
When Clico em "Filtrar por Data"
And  Escrevo a data "23/06/2003"
Then Vejo a lista de resultados da minha pesquisa ser atualizada
And Vejo apenas a mensagem "Target1" na lista de resultados agora


# Service Scenario

Scenario: Filtrar resultados de pesquisa em uma conversa específica
Given "Biel" e "Luis" são usuários do sistema
And  A mensagem "Target1", que foi enviada na data "23/06/2003", está na"Lista de Mensagens de texto da Conversa"
When O usuário "biel" pesquisa pela palavra-chave "Target" na conversa com o usuário "Luis" na data "23/06/2003"
Then O sistema direciona o usuário "Biel" para onde a mensagem "Target1" foi enviada na conversa com o usuário "Luis"
