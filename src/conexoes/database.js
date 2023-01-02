//Get NPM Modules
const mysql = require("mysql2");
//Get Ext Scripts
let variables = require("../config/config.json")
//Get Variables
let dados = {}
dados.linhas = []
//SET CONECTIONS
const infos = { 
    host: variables.database.cloudServer.host,
    user: variables.database.cloudServer.username, 
    password: variables.database.cloudServer.password, 
    database: variables.database.cloudServer.scheme, 
    waitForConnections: true 
}
//Create Pool Conections
const connection = mysql.createPool(infos);
//Create Query Conections
const executeQuery = async (sql, values) => {
    const promisePools = connection.promise();
    return await promisePools.query(sql, values)
}
//Build Loopdata from Execute Query
const buildLoopFromQuery = async (linhas) => {
    //Set Datas de Cadastro, Vencimentos e Emissão
    dados.rows = {}
    dados.rows.datas = {}
    //Set Dados linhas
    dados.linhas.push(dados.rows)
}
//Execute Loopdata from SQL Query
const executeLoop = async (rows) => {
    for (const dados in rows) {
        if (Object.hasOwnProperty.call(rows, dados)) {
            const linhas = rows[dados];
            await buildLoopFromQuery(linhas)
        }
    }
    return dados.linhas
}
//SET CONECTIONS
module.exports = { executeQuery, executeLoop };