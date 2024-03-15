/// <reference types="Cypress" />/

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    
    
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatorios ',function()
    {
        cy.get('#firstName').type('joao victor')
        cy.get('#lastName').type('silva')
        cy.get('#email').type('teste@testegmail.com.br')
        cy.get('#open-text-area').type('testeeee')
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function()
    {

        cy.get('#firstName').type('joao')
        cy.get('#lastName').type('silva')
        cy.get('#email').type('teste@testegmail,com,br')
        cy.get('#open-text-area').type('testeeee')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('campo teleone vazio preenchido com um valor nao numerico',function(){
        cy.get('#phone').type('abcdeh').should('have.value','')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
        
        cy.get('#firstName').type('joao')
        cy.get('#lastName').type('ferrari')
        cy.get('#email').type('teste@testegmail.com.br')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('testeeee')
        cy.contains('button', 'Enviar').click()
        //cy.contains =('sleetor', 'texto desse seletor')
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
        cy.get('#firstName')
        .type('joao')
        .should('have.value','joao')
        .clear()
        .should('have.value','')

        cy.get('#lastName')
        .type('silva')
        .should('have.value','silva')
        .clear()
        .should('have.value','')

        cy.get('#email')
        .type('teste@testegmail.com.br')
        .should('have.value','teste@testegmail.com.br')
        .clear()
        .should('have.value','')

    })
    it('exibe mensagem de erro ao submeter o formulario sem preencher os campos obrigatórios',function(){
    
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    })
    it('envia o formulario com sucesso usando um comando customizado',function(){

        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })


    it('Seleciona um Produto (youtube) por seu texto', function(){

        cy.get('#product')
         .select('YouTube')
         .should('have.value', 'youtube')
    })

    it('Seleciona um Produto (Mentoria) por seu valor(value)', function(){

       cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('Seleciona um Produto (Blog) por seu indeice', function(){

        cy.get('#product')
         .select(1)
         .should('have.value', 'blog')
     })
     it('Marca o tipo de atendiemnto "Feedback"',function(){

        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value','feedback')
    })
    
    it('Marca cada tipo de atendimento',function(){

        cy.get('input[type="radio"]')
         .should('have.length', 3)    //interando vendo os tres radios da aplicação
         .each(function($radio){     //pega cada um dos radios
            cy.wrap($radio).check()  //empacotar/funçaõ cada um dos radios
            cy.wrap($radio).should('be.checked') //selecioanr o check em todos 
         }) 

    })
        //uncheck para desmarcar sempre no teste é bom chekar e desmarcar 
    it('DMarca ambos checkboxe, depois desmarca o ultimo ',function(){
            //pegou todos os checkbox que estvam marcados e desmarcou o ultimo
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')

    })
    it('Selecionando um arquivo da pasta fixtures',function(){

        cy.get('input[type="file"]')
        ///cy.get('#file-upload')
        .should('not.have.value')//verificar que n tem enhhum valor ainda 
        .selectFile('./cypress/fixtures/example.json')//caminho upload do arquivo pra fazer o upload
        .should(function($input){ //
            console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')//primeiro input 0 que oname do obj do arquivo é eample.json

        })
    })
    it('Selecione um arquivo simulando um drag-and-drop',function(){
        
        cy.get('input[type="file"]')
        ///cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json',{action:'drag-drop'})//simulando com o explorer de arquvios aberto arrastando o arquivo na aplicação
        .should(function($input){ 
            console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
        

    })
    
   })

   it('Selecione um arquivo utilizando uma fixture para a qual foi dada um alias',function(){

        cy.fixture('example.json').as('sampleFile')//para pegar uma fixtura dando um AS-alias pra ela
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')//@ e o nome do AS
        .should(function($input){ 
            console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
        

    })

        
   })
   
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
         cy.get('#privacy a').should('have.attr','target','_blank')

    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link',function(){
        cy.get('#privacy a')
        .invoke('removeAttr','target')//remove atributo ex:blank
        .click()
        
        cy.contains('Talking About Testing').should('be.visible')

    })

/*qaundo quiser mudar para dimensão de um mobile so alterar no cypress.json alterando no viewportHeight e Widht*/

})
