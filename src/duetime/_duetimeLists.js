//Get NPM Modules
const mysql = require('mysql2/promise')
const fs = require('fs')
let { executeQuery, executeLoop } = require("../conexoes/database")
let { newTimer, timeBetween } = require("../getclocks/_getclocks")
//Get Ext Scripts
let variables = require("../config/config.json")
//Get Variables
let db = {}
db.raw = {}
/* ------------------------------------- Get BlackBox ------------------------------------- */
//Create Folder Logs
const createLogFolder = () => {
    if (!fs.existsSync(`${variables.variables.paths.dir}logs`)) fs.mkdirSync(`${variables.variables.paths.dir}logs`)
    return
}
createLogFolder()
//Create Files
const createJsonFiles = async (fileName = '') => {
    if (fileName == '') return;
    if (!fs.existsSync(`${variables.variables.paths.dir}logs/${fileName}.json`)) return fs.createReadStream(`${variables.variables.paths.dir}logs/${fileName}.json`)
}
//Write log
const writeLogToJson = async (file, content) => fs.writeFileSync(`${variables.variables.paths.dir}logs/${file}.json`, JSON.stringify(content))
//Get SQL Boleto
const sqlBoletos = () => {
    db.sql = "SELECT `bol_data_cadastro`, `bol_destinatario`, `bol_nota`, `bol_vencimento`, `bol_fatura`, `bol_info_boleto`, `bol_code`, `nf_emissao`, `nf_numero`, `nf_chave`, `nf_valor`, `des_nome`, `des_documento`, `des_email` "
    db.sql += "FROM `empresa_notas_boletos` ";
    db.sql += "INNER JOIN `empresa_notas` ON `empresa_notas_boletos`.`bol_nota` = `empresa_notas`.`nf_id` "
    db.sql += "INNER JOIN `empresa_notas_destinatarios` ON `empresa_notas_boletos`.`bol_destinatario` = `empresa_notas_destinatarios`.`des_id`"
    return db;
}
/* ------------------------------------ Start Process ------------------------------------ */
//Create List of pays by due time
const createDueTimeLists = async (req, res) => {
    //Listar todos os boletos disponiveis no db
    let sql = sqlBoletos()
    await executeQuery(sql.sql)
        .then(async ([rows, fields]) => {
            //Store data in db loop
            let dd = await executeLoop(rows)
            db.raw.data = dd
            console.log(db.raw.data.length);
        }).then(async () => {
            variables.vencimentos.d3 = []
            await createJsonFiles('vencimentos-3-dias')
            for (const linhas of db.raw.data) {
                let now = new Date(newTimer(new Date()).fulldate)
                let vencimento = new Date(linhas.datas.vencimento)
                let timebetween = await timeBetween(vencimento, now)
                //Set Vencimentos para daqui a 3 dias
                if (parseInt(timebetween) === 3) variables.vencimentos.d3.push({linhas})
            }
        }).then(async () => {
            variables.vencimentos.d7 = []
            await createJsonFiles('vencimentos-7-dias')
            for (const linhas of db.raw.data) {
                let now = new Date(newTimer(new Date()).fulldate)
                let vencimento = new Date(linhas.datas.vencimento)
                let timebetween = await timeBetween(vencimento, now)
                //Set Vencimentos para daqui a 7 dias
                if (parseInt(timebetween) === 7) variables.vencimentos.d7.push({linhas})
            }
        }).then(async () => {
            variables.vencimentos.atrasos = []
            await createJsonFiles('vencimentos-atrasos')
            for (const linhas of db.raw.data) {
                let now = new Date(newTimer(new Date()).fulldate)
                let vencimento = new Date(linhas.datas.vencimento)
                let timebetween = await timeBetween(vencimento, now)
                //Set Vencimentos em Atrasos
                if (parseInt(timebetween) < 0) variables.vencimentos.atrasos.push({linhas})
            }
        }).then(async () => {
            variables.vencimentos.d0 = []
            await createJsonFiles('vencimentos-de-hoje')
            for (const linhas of db.raw.data) {
                let now = new Date(newTimer(new Date()).fulldate)
                let vencimento = new Date(linhas.datas.vencimento)
                let timebetween = await timeBetween(vencimento, now)
                //Set Vencimentos em jk
                if (parseInt(timebetween) == 0) variables.vencimentos.d0.push({linhas})
            }
        }).then(async () => {
            //Create File depicturing due time till 3 days
            await writeLogToJson("vencimentos-3-dias" , {"vencimentos": variables.vencimentos.d3})
            //Create File depicturing due time till 7 days
            await writeLogToJson("vencimentos-7-dias" , {"vencimentos": variables.vencimentos.d7})
            //Create File depicturing due time today
            await writeLogToJson("vencimentos-de-hoje" , {"vencimentos": variables.vencimentos.d0})            
            //Create File depicturing due already blowup
            await writeLogToJson("vencimentos-atrasos" , {"vencimentos": variables.vencimentos.atrasos})
        }).catch((errs) => { console.log(errs); })
}
//Export data
module.exports = { createDueTimeLists }