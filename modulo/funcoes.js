/***********************************************************************************
 * Objetivo: Arquivo responsavel por criar as funções para a API do whatsapp
 * Data: 24/09/2025
 * Autor: Giovana Barbosa Souza
 * Versão: 1.0
 *********************************************************************/

//Import do aquivo contatos 
const dados = require ('./contatos.js')
const MESSAGE_ERROR = {status: false, statuscode: 500, programador: 'Giovana Barbosa Souza', }

//retornar todos os dados 
const getAllDados = function (){
    let message = {status: true, statuscode: 200, programador: 'Giovana Barbosa Souza', users: []}
    
    dados.contatos["whats-users"].id.forEach(function (usuario){
        message.users.push(usuario)
    })
       
     if(message.users != 0){
        // console.log(message)
        
         return message
     }else{
        return MESSAGE_ERROR
     }
     

}
   console.log(message) 


//Retornar dados da conta do usuário 
const getAllDadosConta = function () {}

//Retornar dados de contato para cada usuario 
const getDadosUsuario = function () {}

//Retornar todas as mensagens trocadas de uma conta de usuário
const getMensagensTrocadas = function () {}

//Retornar uma conversa de um usuário e um contato 
const getConversaUsuario = function () {}

//Filtro com uma palavra chave 
const getPalavraChave = function () {}


module.exports = {
    // getAllDados
}