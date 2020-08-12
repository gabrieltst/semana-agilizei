/// <reference types="Cypress" />

let Chance = require('chance');
let chance = new Chance();

context('Cadastro', () => {
    it('Cadastro de um usuário no site', () => {
        //rotas

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

        //type -> inputs
        cy.get('input[placeholder="First Name"]').type(chance.first());
        cy.get('input[ng-model^=Last]').type(chance.last()); // ^= -> Procura elementos que tenham o atributo e que começam com Last
        cy.get('input[ng-model^=Email').type(chance.email());
        cy.get('input[ng-model^=Phone]').type(chance.phone({formatted:false}));

        //check -> radio's e checkboxes
        cy.get('input[value=FeMale]').check();
        cy.get('input[type=checkbox]').check('Cricket'); //Na página há varios elementos desse tipo. O valor entre aspas simples é o value do elemento.
        cy.get('input[type=checkbox]').check('Hockey');

        //selects -> selects e select2(comboboxes)
        cy.get('select#Skills').select('Javascript'); //O valor pode ser escolhido pelo atributo value ou pelo texto visível da opção
        cy.get('select#countries').select('Argentina');
        cy.get('select#country').select('Australia', {force:true});
        cy.get('select#yearbox').select('1996');
        cy.get('select[ng-model=monthbox]').select('February');
        cy.get('select#daybox').select('24');

        cy.get('input#firstpassword').type('Agilizei@2020');
        cy.get('input#secondpassword').type('Agilizei@2020');

        //upload de arquivo
        cy.get('input#imagesrc').attachFile('perfil.jpg'); //Está pegando por padrão o arquivo da pasta Fixtures

        //clicar no botão
        cy.get('button#submitbtn').click();

        //interação com rotas através do alias
        cy.wait('@postNewTable').then((resNewTable) => { //Esperar que esta rota tenha uma resposta e interagir com essa resposta
            //na biblioteca chai podemos utilizar expect ou should para asserções
            expect(resNewTable.status).to.eq(200);
        });

        cy.wait('@postUserTable').then((resUserTable) => {
            expect(resUserTable.status).to.eq(200);
        });

        cy.wait('@getNewTable').then((resNewTable) => {
            expect(resNewTable.status).to.eq(200);
        });

        //validar se a aplicação direcionou para outra url após o cadastro
        cy.url().should('contain', 'WebTable');
    });
});