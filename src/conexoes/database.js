//Get NPM Modules
const mysql = require("mysql2");
//Get Ext Scripts
let variables = require("../config/config.json")
//Get Variables
let dados = {}
dados.linhas = []
dados.bounces = []
//SET CONECTIONS
const conexoesInfos = async (node = 'cloudServer') => {
    return {
        host: variables.database[node].host,
        user: variables.database[node].username, 
        password: variables.database[node].password, 
        database: variables.database[node].scheme, 
        waitForConnections: true
    }
}
//Create Query Conections
const executeQuery = async (sql, values = '', node = 'cloudServer') => {
    //Create Pool Conections
    const connection = mysql.createPool(await conexoesInfos(node));
    //Execute Query data
    const promisePools = connection.promise();
    return await promisePools.query(sql, values)
}
//Build Loopdata from Execute Query
const buildLoopFromQuery = async (linhas) => {
    //Set Datas de Cadastro NFE e Boletos
    dados.rows = {}
    //Dados de Cadastro e Vencimentos
    dados.rows.datas = {}
    dados.rows.datas.cadastro = (!linhas.bol_data_cadastro)? null : linhas.bol_data_cadastro
    dados.rows.datas.vencimento = (!linhas.bol_vencimento)? null : linhas.bol_vencimento
    dados.rows.datas.emissao = (!linhas.nf_emissao)? null : linhas.nf_emissao
    //Dados do Cliente & Documento cadastrado do cliente
    dados.rows.cliente = {}
    dados.rows.cliente.destinatario = (!linhas.bol_destinatario)? null : linhas.bol_destinatario
    dados.rows.cliente.nome = (!linhas.des_nome)? null : linhas.des_nome
    dados.rows.cliente.email = (!linhas.des_email)? null : linhas.des_email
    //(linhas.des_documento.length === 11)? dados.rows.cliente.cpf = linhas.des_documento : dados.rows.cliente.cnpj = linhas.des_documento;
    if (linhas.des_documento.length === 11) dados.rows.cliente.cpf = linhas.des_documento 
    if (linhas.des_documento.length === 14) dados.rows.cliente.cnpj = linhas.des_documento
    if (linhas.des_documento.length !== 11 || linhas.des_documento.length !== 14) dados.rows.cliente.doc = linhas.des_documento
    //Dados de Emissão da NFE
    dados.rows.nfe = {}
    dados.rows.nfe.faturas = (!linhas.bol_fatura)? null : linhas.bol_fatura
    dados.rows.nfe.nfe = (!linhas.nf_numero)? null : linhas.nf_numero
    dados.rows.nfe.valor = (!linhas.nf_valor)? null : linhas.nf_valor
    dados.rows.nfe.key = (!linhas.nf_chave)? null : linhas.nf_chave
    dados.rows.nfe.id = (!linhas.nf_id)? null : linhas.nf_id
    //Set Dados linhas
    dados.linhas.push(dados.rows)
}
//Build Loopdata from Execute Query -> Black List
const buildLoopBlackList = async (linhas) => {
    //Dados Rows
    dados.rows = {}
    //Dados de Cadastro e Vencimentos
    dados.rows.bounces = {}
    //dados.rows.bounces.cadastro = linhas.uilvb_cadastro
    dados.rows.bounces.email = linhas.uilvb_email
    //Set Dados Bounces
    dados.bounces.push(dados.rows.bounces.email)
}
//Execute Loopdata from SQL Query
const executeLoop = async (rows, type = 'listarEmails') => {
    for (const dados in rows) {
        if (Object.hasOwnProperty.call(rows, dados)) {
            const linhas = rows[dados];
            //Set type Loopdata
            if (type === 'listarEmails') await buildLoopFromQuery(linhas)
            if (type === 'blackList') await buildLoopBlackList(linhas)
        }
    }
    return dados
}
//SET CONECTIONS
module.exports = { executeQuery, executeLoop };