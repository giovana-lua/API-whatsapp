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
    let message = {status: true, statuscode: 200, programador: 'Giovana Barbosa Souza',  users: []}
    
    dados.contatos["whats-users"].forEach(function (item){
        message.users.push(item)
    })
       
     if(message.users.length > 0){
         
        
         return message
     }else{
        return MESSAGE_ERROR
     }
     
}
    //console.log(getAllDados())
   

//Retornar dados da conta 
const getAllDadosConta = function (number) {
    let message = {status: true, statuscode: 200, programador: 'Giovana Barbosa Souza',  profile: []}

    const userProfile = dados.contatos["whats-users"].find(function (item){
        return item.number === number 
    })

    if(userProfile){

        const nomeCorrigido = {
            nome: userProfile.account,
            apelido: userProfile.nickname,
            numero: userProfile.number,
            foto: userProfile['profile-image'],
            data_criacao: userProfile['created-since'].start,
            data_fim: userProfile['created-since'].end,
            cor_fundo: userProfile.background,
            contatos: userProfile.contacts,
           
        }
        
        return nomeCorrigido
    }else{
        return MESSAGE_ERROR
    }
}
//console.log(getAllDadosConta("11955577796"))


//Retornar dados da conta de usuário especifico e os contatos dele 
const getDadosUsuario = function (number) {
    let message = {status: true, statuscode: 200, programador: 'Giovana Barbosa Souza',  contatos: []}
    const profileUser = dados.contatos["whats-users"].find(function (item){
        return item.number === number
        
    })
    if(profileUser  ){
        message.contatos = profileUser
        message.contacts = profileUser.contacts

        // const user = {
        //     nome: profileUser.account,
        //     apelido: profileUser.nickname,
        //     foto: profileUser['profile-image'],
        //     contatos: profileUser.contacts.map(function(contacts){
        //         return contacts.name
        //     })

        // }

        return message

        
    } else{
        message.contatos = `Usuário com número ${number} não encontrado`
        return  message
    }
}
//console.log(getDadosUsuario("11987876567"))

//Retornar todas as mensagens trocadas de uma conta de usuário
const getMensagensTrocadas = function (number) {
    let message = {status: true, statuscode: 200, programador: 'Giovana Barbosa Souza',  mensagens: []}
      const mensagem =  dados.contatos["whats-users"].find(function (item){
          return item.number === number
    })
    if(mensagem){
        
        const mensagensTrocadas ={
            nome: mensagem.account,
            mensagens: mensagem.contacts.map(function(mensagens){
                return mensagens.messages
            })
        }
        return mensagensTrocadas
    } else{
        return MESSAGE_ERROR
    }
}
//console.log(getMensagensTrocadas("11987876567"))

//Retornar uma conversa de um usuário e um contato 
const getConversaUsuario = function (number, numberContact) {

    let message = {status: true, statuscode: 200, programador: 'Giovana Barbosa Souza'}
    const user = dados.contatos["whats-users"].find(function (item){
        return item.number === number
    })
    if(!user){
        return MESSAGE_ERROR
    }

    const contato = user.contacts.find(contato => contato.number === numberContact )
    return {
        message,
        mensagens: [
            {perfil: user.account,
                nome: contato.name,
                imagem: contato.image,
                mensagens: contato.messages
            }
        ]
    }
}

//console.log (JSON.stringify(getConversaUsuario("11987876567","26999999968"), null, 2))

//Filtro com uma palavra chave 
const getPalavraChave = function (number, numberContact, keyword) {
    let message = {status: true, statuscode: 200, programador: 'Giovana Barbosa Souza'}
    const user = dados?.contatos?.["whats-users"].find(user => user.number === number)

    if(!user)
        return MESSAGE_ERROR
    
    const contato = user.contacts.find(contato => contato.number === numberContact)
    if(!contato)
        return MESSAGE_ERROR
    

    const menssageFilter = contato.messages.filter(mensagem => 
        mensagem.content && mensagem.content.toLowerCase().includes(keyword.toLowerCase()))

        return{
            message,
            
                perfil: user.account,
                contato_mensagens:
                {
                    nome: contato.name,
                    imagem: contato.image,
                    numero: contato.number,
                    mensagens: menssageFilter

                }
            
           
        }
}

console.log (getPalavraChave("11987876567","26999999968", 'hello'))

module.exports = {
     getAllDados,
     getAllDadosConta,
     getDadosUsuario
}