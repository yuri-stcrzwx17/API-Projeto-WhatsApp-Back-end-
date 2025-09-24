// funcoes.js

const dados = require('./contatos.js');

// Helper function to find a user by ID
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
    // Agrupa todas as mensagens de todos os contatos do usuário
    let todasAsMensagens = [];
    usuario.contacts.forEach(contato => {
        todasAsMensagens = todasAsMensagens.concat(contato.messages);
    });
    return todasAsMensagens;
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