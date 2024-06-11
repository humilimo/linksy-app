Feature: Conversas em Grupo
As a Usuário do sistema
I want to Conseguir criar, adicionar e remover membros, configurar, enviar mensagens e sair de um grupo
So that Eu possa interagir com mais de um usuário em uma mesma página de conversa

# GUI Scenarios

    Scenario: Criar um novo grupo
    Given Estou logado como o usuário de username "man2"
    And Estou na Página "Lista de Conversas"
    And Os usuários "crc", "lfoc" estão na minha "Lista de Amigos"
    When Clico em "Criar Grupo"
    And Preencho o nome do grupo com "Projeto ESS - Grupo 6"
    And Seleciono da minha "Lista de Amigos" os usuários de username "crc" e "lfoc"
    And Faço Upload de uma imagem de um computador como "Foto do grupo"
    And Clico em "Confirmar"
    Then Eu sou redirecionada para a Página "Conversa" do grupo "Projeto ESS - Grupo 6"
    And Vejo mensagens dizendo que o grupo "Projeto ESS - Grupo 6" foi criado e que os usuários "crc" e "lfoc" foram adicionados
    And Vejo no topo da tela o nome e a imagem do grupo "Projeto ESS - Grupo 6"

    Scenario: Abrir Perfil do Grupo
    Given Estou logado como o usuário de username "man2"
    And Estou na Página "Conversa" do grupo de nome "Projeto ESS - Grupo 6"
    And os usuários "crc" e "lfoc" são participantes do grupo
    And a descrição do grupo é "isso não é um grupo"
    When Clico em "Configurações"
    Then Eu sou redirecionado para a Página "Perfil do Grupo" do grupo "Projeto ESS - Grupo 6"
    And o nome do grupo "Projeto ESS - Grupo 6" é exibido na tela
    And a descrição do grupo "Projeto ESS - Grupo 6" é exibida na tela
    And a lista de participantes contém os usuários "man2", "crc" e "lfoc"

    Scenario: Alterar Nome do Grupo
    Given Estou logado como o usuário de username "man2" 
    And Estou na Página "Configurações do Grupo" do grupo "Projeto ESS - Grupo 6"
    And Eu tenho o cargo de "admin" do grupo "Projeto ESS - Grupo 6"
    When Clico em "Alterar Nome do Grupo"
    And Escrevo "Projeto ESS"
    And Confirmo minha mudança
    Then Eu sou redirecionado para a Página "Conversa" do grupo "Projeto ESS"
    And Eu vejo uma mensagem dizendo que o nome do grupo "Projeto ESS" foi alterado
    And Eu vejo no topo da tela que o nome do grupo "Projeto ESS" está "Projeto ESS" e não mais "Projeto ESS - Grupo 6"

    Scenario: Alterar Imagem do Grupo
    Given Estou logado como o usuário de username "man2" 
    And Estou na Página "Configurações do Grupo" do grupo "Projeto ESS"
    And Eu tenho o cargo de "admin" do grupo "Projeto ESS"
    And a imagem do grupo "Projeto ESS" é um computador
    When Clico em "Alterar Imagem do Grupo"
    And Faço upload de uma imagem de um celular
    And Confirmo minha mudança
    Then Eu sou redirecionado para a Página "Conversa" do grupo "Projeto ESS"
    And Eu vejo uma mensagem dizendo que a imagem do grupo "Projeto ESS" foi alterada 

    Scenario: Alterar Descrição do Grupo
    Given Estou logado como o usuário de username "man2" 
    And Estou na Página "Configurações do Grupo" do grupo "Projeto ESS - Grupo 6"
    And Eu tenho o cargo de "admin" do grupo "Projeto ESS"
    And A descrição do grupo "Projeto ESS" é "Grupo 6 do Projeto de ESS"
    When Clico em "Alterar Descrição do Grupo"
    And Escrevo "Grupo 6 do Projeto da Disciplina de ESS"
    And Confirmo minha mudança
    Then Eu sou redirecionado para a Página "Conversa" do grupo "Projeto ESS"
    And Eu vejo uma mensagem dizendo que a descrição do grupo "Projeto ESS" foi alterada


    Scenario: Gerenciar Cargos do Grupo
    Given Estou logado como o usuário de username "man2" 
    And Estou na Página "Configurações do Grupo" do grupo "Projeto ESS"
    And Eu e o usuário "crc" temos o cargo de "admin" do grupo "Projeto ESS"
    And "lfoc" temos o cargo de "membro" do grupo "Projeto ESS"
    When Clico em "Gerenciar Admins do Grupo"
    And Eu altero o cargo do usuário "crc" para "membro"
    And Eu altero o cargo do usuário "lfoc" para "admin"
    And Eu confirmo minhas mudanças
    Then Eu sou redirecionado para a Página "Conversa" do grupo "Projeto ESS"
    And Eu vejo uma mensagem dizendo que o usuário "crc" tem o cargo de "membro" e não mais de "admin" do grupo "Projeto ESS"
    And Eu vejo uma mensagem dizendo que o usuário "lfoc" tem o cargo de "admin" e não mais de "membro" do grupo "Projeto ESS"

    Scenario: Adicionar Usuário em um grupo
    Given Estou logado como o usuário de username "man2" 
    And Estou na Página "Configurações do Grupo" do grupo "Projeto ESS"
    And Eu tenho o cargo de "admin" do grupo "Projeto ESS"
    And O usuário "gvab" está na minha "Lista de Amigos"
    When Clico em "Adicionar Usuários"
    And Seleciono da minha "Lista de Amigos" o usuário de username "gvab"
    Then Eu sou redirecionado para a Página "Conversa" do grupo "Projeto ESS"
    And Eu vejo uma mensagem dizendo que o usuário "gvab" foi adicionado ao grupo

    Scenario: Remover Usuário de um grupo
    Given Estou logado como o usuário de username "man2" 
    And Estou na Página "Configurações do Grupo" do grupo "Projeto ESS"
    And Eu tenho o cargo de "admin" do grupo "Projeto ESS"
    And Os usuários "crc", "lfoc" e "gvab" estão no grupo "Projeto ESS"
    When Seleciono o usuário "gvab" da lista de membros do grupo
    And Clico em "Remover Membro"
    Then Eu sou redirecionado para a Página "Conversa" do grupo "Projeto ESS"
    And Eu vejo uma mensagem dizendo que o usuário "gvab" foi removido do grupo

    Scenario: Sair de um grupo
    Given Estou logado como o usuário de username "man2" 
    And Estou na Página "Configurações do Grupo" do grupo "Projeto ESS"
    When Clico em "Sair do Grupo" e Confirmo minha saída
    Then Eu sou redirecionado para a Página "Lista de Conversas"
    And eu não vejo mais o grupo "Projeto ESS"

    Scenario: Deletar um grupo inteiramente
    Given Estou logado como o usuário de username "man2" 
    And Estou na Página "Configurações do Grupo" do grupo "Projeto ESS"
    And Eu tenho o cargo de "admin" do grupo "Projeto ESS"
    When Clico em "Deletar Grupo" e Confirmo minha ação
    Then Eu sou redirecionado para a Página "Lista de Conversas" 
    And Eu não vejo mais o grupo "Projeto ESS"


# Service Scenarios

    Scenario: Adicionar Usuários em um grupo
    Given Os usuários "man2" e "gvab" estão cadastrados no sistema
    And O grupo "Projeto ESS" está cadastrado no sistema
    And O usuário "man2" está no grupo "Projeto ESS" e tem o cargo de "admin" do grupo "Projeto ESS"
    And O usuário "gvab" está na "Lista de Amigos" de "man2"
    When O usuário "man2" seleciona o usuário "gvab" para adicionar ao grupo
    Then O sistema adiciona o usuário "gvab" ao grupo "Projeto ESS"
    And O sistema sincroniza todas as mensagens anteriores do grupo "Projeto ESS" com o usuário "gvab"

    Scenario: Remover Usuário de um grupo
    Given Os usuários "man2" e "gvab" estão cadastrados no sistema
    And O grupo "Projeto ESS" está cadastrado no sistema 
    And O usuário "man2" está no grupo "Projeto ESS" e tem o cargo de "admin" do grupo "Projeto ESS"
    And O usuário "gvab" está no grupo "Projeto ESS" e tem o cargo de "membro" do grupo "Projeto ESS"
    When O usuário "man2" seleciona o usuário "gvab" para remover do grupo
    Then O sistema remove o usuário "gvab" do grupo "Projeto ESS"
    And O sistema deleta todo o conteúdo do grupo "Projeto ESS" para o usuário "gvab"

    Scenario: Sair de um grupo
    Given Os usuários "man2" e "crc" estão cadastrados no sistema
    And O grupo "Projeto ESS" está cadastrado no sistema 
    And O usuário "man2" está no grupo "Projeto ESS" e tem o cargo de "admin" do grupo "Projeto ESS"
    And O usuário "crc" está no grupo "Projeto ESS" e tem o cargo de "membro" do grupo "Projeto ESS"
    When O usuário "crc" sai do grupo "Projeto ESS"
    Then O sistema remove o usuário "crc" do grupo "Projeto ESS"

    Scenario: Deletar um grupo inteiramente
    Given Os usuários "man2", "lfoc" e "crc" estão cadastrados no sistema
    And O grupo "Projeto ESS" está cadastrado no sistema
    And O usuário "man2" está no grupo "Projeto ESS" e tem o cargo de "admin" do grupo "Projeto ESS"
    And Os usuários "lfoc" e "crc" estão no grupo "Projeto ESS" e têm o cargo de "membro" do grupo "Projeto ESS"
    When O usuário "man2" deleta o grupo
    Then O sistema remove os usuários "man2", "lfoc" e "crc" do grupo "Projeto ESS"
    And O grupo "Projeto ESS" não está mais cadastrado no sistema 

    Scenario: Visualizar quantos e quais usuários tem no grupo
    Given Os usuários "man2", "gvab", "crc" e "lfoc" estão cadastrados no sistema
    And O grupo "Projeto ESS" está cadastrado no sistema 
    And o usuário "man2" está no grupo "Projeto ESS" e tem o cargo de "admin" do grupo "Projeto ESS"
    And os usuário "gvab", "crc" e "lfoc" estão no grupo "Projeto ESS" e têm o cargo de "membro" do grupo "Projeto ESS"
    When O usuário "man2" requisita ao sistema a quantidade e a lista de usuários no grupo "Projeto ESS"
    Then O sistema retorna "4" e uma lista com os membros  "man2", "gvab", "crc" e "lfoc"