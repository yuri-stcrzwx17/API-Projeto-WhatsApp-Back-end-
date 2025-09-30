/***********************************************************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelas funções para criar a API da atividade do WhatsApp
 * Data: 24/09/2025
 * Autor: Yuri Silva de Oliveira
 * Versão: 1.0
 **********************************************************************************************************************************************************************************************************************************/

const dados = require('./contatos.js');

//função Detetive (ela vai encontar os dados pelo id)
function encontrarUsuarioPorId(id) {
    // Converte o ID para número e procura no array de usuários
    return dados["whats-users"].find(user => user.id === parseInt(id));
}

// 1. Listar todos os dados de usuário
function listarUsuario(id) {
    return encontrarUsuarioPorId(id);
}

// 2. Listar dados do perfil do usuário
function listarPerfil(id) {
    const usuario = encontrarUsuarioPorId(id);
    if (!usuario) {
        return null;
    }

    // Retorna apenas os dados relevantes do perfil
    return {
        account: usuario.account,
        nickname: usuario.nickname,
        profileImage: usuario["profile-image"],
        number: usuario.number,
        background: usuario.background,
        createdSince: usuario["created-since"]
    };
}

// 3. Listar dados de contato para cada usuário
function listarContatos(id) {
    const usuario = encontrarUsuarioPorId(id);
    if (!usuario) {
        return [];
    }

    // Retorna apenas os dados de contato(sem msgs)
    return usuario.contacts.map(contato => {
        return {
            name: contato.name,
            number: contato.number,
            description: contato.description,
            image: contato.image
        };
    });
}

// 4. Listar todas as mensagens trocadas de uma conta de usuário
function listarMensagens(id) {
    const usuario = encontrarUsuarioPorId(id);
    if (!usuario) {
        return [];
    }

    //função que vai retornar as msg junto com as informações dos contatos
    const todasAsMensagensComContato = usuario.contacts.flatMap(contato => {
        return contato.messages.map(mensagem => {
            return {
                ...mensagem,
                contact_info: {
                    name: contato.name,
                    number: contato.number,
                    image: contato.image,
                    description: contato.description
                }
            };
        });
    });

    return todasAsMensagensComContato;
}

// 5. Listar uma conversa de um usuário e um contato (via Query)
function listarConversaPorNumero(idUsuario, numeroContato) {
    const usuario = encontrarUsuarioPorId(idUsuario);
    if (!usuario) {
        return null;
    }
    const contato = usuario.contacts.find(c => c.number === numeroContato);
    return contato ? contato.messages : null;
}

// 6. Realizar um filtro de "pesquisa de palavra-chave"
function pesquisarMensagens(idUsuario, termo) {
    const usuario = encontrarUsuarioPorId(idUsuario);
    if (!usuario) {
        return [];
    }
    const termoPesquisa = termo.toLowerCase();
    let resultados = [];
    usuario.contacts.forEach(contato => {
        const mensagensEncontradas = contato.messages.filter(msg => 
            msg.content.toLowerCase().includes(termoPesquisa)
        );
        resultados = resultados.concat(mensagensEncontradas);
    });
    return resultados;
}

module.exports = {
    listarUsuario,
    listarPerfil,
    listarContatos,
    listarMensagens,
    listarConversaPorNumero,
    pesquisarMensagens
};