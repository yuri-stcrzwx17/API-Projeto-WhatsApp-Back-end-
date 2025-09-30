/***********************************************************************************************************************************************************************************************************************************
 * Objetivo: API responsavel em criar endpoints referentes a atividade 
 * Data:24/09/2025
 * Autor: Yuri Silva de Oliveira
 * Versão: 1.0
 * 
 * dependencias para criar a API: 
 *    express     - npm install express       --save instala  as dependencias para criar a API
 *    cors        - npm install cors          --save instala  as dependencias para configuarar as permissoes de uma API
 *    body-parser - npm install body-parser   --save instala  as dependencias para receber os tipos de dados via POST ou PUT
 ************************************************************************************************************************************************************************************************************************************/

const express = require('express');
const app = express();
const port = 3000;

// Importa as funções do arquivo funcoes.js
const funcoes = require('./modulo/funcoes.js');

app.use(express.json());

// Rota para listar todos os dados de usuário por ID
app.get('/v1/whatsapp/usuario/:id', (req, res) => {
    const usuario = funcoes.listarUsuario(req.params.id);
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({ error: 'Usuário não encontrado.' });
    }
});

// Rota para listar dados do perfil do usuário por ID
app.get('/v1/whatsapp/perfil/:id', (req, res) => {
    const perfil = funcoes.listarPerfil(req.params.id);
    if (perfil) {
        res.json(perfil);
    } else {
        res.status(404).json({ error: 'Perfil não encontrado.' });
    }
});

// Rota para listar dados de contato para um usuário por ID
app.get('/v1/whatsapp/contatos/:id', (req, res) => {
    const contatos = funcoes.listarContatos(req.params.id);
    if (contatos.length > 0) {
        res.json(contatos);
    } else {
        res.status(404).json({ error: 'Contatos não encontrados para este usuário.' });
    }
});

// Rota para listar todas as mensagens de um usuário por ID
app.get('/v1/whatsapp/mensagens/:id', (req, res) => {
    const mensagens = funcoes.listarMensagens(req.params.id);
    if (mensagens.length > 0) {
        res.json(mensagens);
    } else {
        res.status(404).json({ error: 'Mensagens não encontradas para este usuário.' });
    }
});

// Rota para listar uma conversa de um usuário e um contato via Query
app.get('/v1/whatsapp/conversa', (req, res) => {
    const idUsuario = req.query.idUsuario;
    const numeroContato = req.query.numeroContato;

    if (!idUsuario || !numeroContato) {
        return res.status(400).json({ error: 'ID do usuário e número do contato devem ser fornecidos na query.' });
    }

    const conversa = funcoes.listarConversaPorNumero(idUsuario, numeroContato);
    if (conversa) {
        res.json(conversa);
    } else {
        res.status(404).json({ error: 'Conversa não encontrada.' });
    }
});

// Rota para pesquisa de palavra-chave
app.get('/v1/whatsapp/pesquisa/:id', (req, res) => {
    const idUsuario = req.params.id;
    const termo = req.query.termo;

    if (!termo) {
        return res.status(400).json({ error: 'Termo de pesquisa não fornecido.' });
    }

    const resultados = funcoes.pesquisarMensagens(idUsuario, termo);
    res.json(resultados);
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});