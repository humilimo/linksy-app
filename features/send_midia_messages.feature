# Feature

Feature: Envio de mídias
    As a Usuário
    I want to Enviar fotos, vídeos, gifs, áudios e outros tipos diferentes de anexos
    So that Eu possa compartilhar conteúdo multimídia com outros usuários, tornando a conversa mais expressiva

# GUI Scenarios

Scenario: Enviar mídia numa conversa (individual / grupo)
    Given Estou logado como o usuário de username "lfoc"
    And Estou na página "Conversa" com os usuários "gvab", "lbc2", "crc" e "slbp"
    When Eu clico em "Enviar anexo"
    And Faço o upload da imagem de um cachorro
    Then Eu vejo a foto do cachorro na página "Conversa"

Scenario: Assistir um vídeo enviado numa conversa (individual/grupo)
    Given Estou logado como o usuário de username "lfoc"
    And Estou na página "Conversa" com os usuários "gvab", "lbc2", "crc" e "slbp"
    And O vídeo de um cachorro, enviado pelo usuário "crc", está visível na conversa
    When Eu clico no vídeo do cachorro
    Then Eu vejo o vídeo sendo reproduzido na página "Conversa"

Scenario: Enviar áudio numa conversa (individual / grupo)
    Given Estou logado como o usuário de username "lfoc"
    And Estou na página "Conversa" com os usuários "gvab", "lbc2", "crc" e "slbp"
    When Eu clico em "Enviar áudio"
    And Falo a palavra "Arroz"
    And Clico em "Parar" para finalizar a gravação
    And Clico em "Enviar"
    Then Eu vejo o áudio na página "Conversa"

Scenario: Ouvir áudio numa conversa (individual / grupo)
    Given Estou logado como o usuário de username "lfoc"
    And Estou na página "Conversa" com os usuários "gvab", "lbc2", "crc" e "slbp"
    And Um áudio enviado por mim ou por outro usuário está visível na conversa
    When Eu clico em "Ouvir" no áudio
    Then O áudio começa a ser reproduzido
    And Eu ouço a palavra "Arroz"

# Service Scenario

Scenario: Envio de mídia numa conversa (individual/grupo)
    Given Os usuários "lfoc", "gvab", "lbc2", "crc" e "slbp" estão cadastrados no sistema
    And Os usuários estão na página "Conversa"
    When O usuário "lfoc" clica em "Enviar anexo"
    And Seleciona uma imagem de um cachorro para enviar
    Then O sistema envia a imagem para a conversa
    And Todos os usuários na conversa podem ver a imagem do cachorro
