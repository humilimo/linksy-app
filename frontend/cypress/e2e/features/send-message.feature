Feature: Envio de mensagens de texto

    Scenario: Visualizar mensagem de texto numa conversa (individual / grupo)
        Given estou logado como o usuário de username "lfoc" e senha "luis12345"
        And o usuário de id "2" está na página da conversa de id "7"
        And estou na conversa de id "7"
        Then eu vejo a mensagem "Eaaaai Luiiiss"

    Scenario: Enviar mensagem de texto numa conversa (individual / grupo)
        Given estou logado como o usuário de username "lfoc" e senha "luis12345"
        And o usuário de id "2" está na página da conversa de id "7"
        And a conversa de id "7" contém a mensagem "Eaaaai Luiiiss"
        When eu digito a mensagem "Oiiii"
        And clico em Enviar
        Then a mensagem "Oiiii" é enviada
        And eu vejo a mensagem "Oiiii"

    Scenario: Receber mensagem de texto numa conversa (individual / grupo)
        Given estou logado como o usuário de username "gvab" e senha "gabriel12345"
        And o usuário de id "4" está na página da conversa de id "7"
        And estou na conversa de id "7"
        Then eu vejo a mensagem "Oiiii"