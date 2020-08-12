//passos comuns a mais de uma feature

Given(/^que acesso o site$/, () => {
    //POST 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
    //POST 200 /api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
    //GET 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X

    cy.server();

    cy.route('POST', '**/api/1/databases/userdetails/collections/newtable?**') //Os asteriscos são caracteres coringas "não importa o host (url) ou o que vem após"
        .as('postNewTable');

    cy.route('POST', '**/api/1/databases/userdetails/collections/usertable?**')
        .as('postUserTable');

    cy.route('GET', '**/api/1/databases/userdetails/collections/newtable?**')
        .as('getNewTable');

    //Base url + Register.html
    cy.visit('Register.html');
});