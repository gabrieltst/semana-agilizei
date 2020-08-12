Feature: Listagem

    language:pt (opcional para definir a linguagem, com # na frente)
    Como usuário, desejo acessar a Listagem
    Para que possa visualizar meus dados de cadastro

Scenario: Listagem sem registros
    Given que o site nao possui registros
    When acessar a Listagem
    Then devo visualizar a listagem vazia

Scenario: Listagem com apenas um registro
    Given que o site possui apenas um registro
    When acessar a Listagem
    Then devo visualizar apenas um registro