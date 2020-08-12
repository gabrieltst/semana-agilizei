Feature: Cadastro

    Como usuario, desejo realizar um Cadastro
    Para que possa acessar o sistema

Scenario: Cadastro de novo usuário
    Given que acesso o site
    When informar meus dados
    And salvar
    Then devo ser cadastrado com sucesso
