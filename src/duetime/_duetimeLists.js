//Get NPM Modules
const mysql = require('mysql2/promise')
let { executeQuery, executeLoop } = require("../conexoes/database")
let { newTimer } = require("../getclocks/_getclocks")
//Get Ext Scripts
let variables = require("../config/config.json")
//Get Variables
let db = {}
db.raw = {}
/* ------------------------------------- Get BlackBox ------------------------------------- */
//Get SQL Boleto
const sqlBoletos = () => {
    db.sql = "SELECT `bol_data_cadastro`, `bol_destinatario`, `bol_nota`, `bol_vencimento`, `bol_fatura`, `bol_info_boleto`, `bol_code`, `nf_emissao`, `nf_numero`, `nf_chave`, `nf_valor`, `des_nome`, `des_documento`, `des_email` "
    db.sql += "FROM `empresa_notas_boletos` ";
    db.sql += "INNER JOIN `empresa_notas` ON `empresa_notas_boletos`.`bol_nota` = `empresa_notas`.`nf_id` "
    db.sql += "INNER JOIN `empresa_notas_destinatarios` ON `empresa_notas_boletos`.`bol_destinatario` = `empresa_notas_destinatarios`.`des_id`"
    return db;
}
//Set data Between
const getTimeBetWeen = async (vencimento, now) => (vencimento.getTime() - now.getTime()) / (1000 * 3600 * 24)
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
        }).then(async () => {
            variables.vencimentos.d3 = []
            for (const linhas of db.raw.data) {
                let now = new Date(newTimer(new Date()).fulldate)
                let vencimento = new Date(linhas.datas.vencimento)
                let timeBetween = await getTimeBetWeen(vencimento, now)
                //Set Vencimentos para daqui a 3 dias
                if (parseInt(timeBetween) === 3) variables.vencimentos.d3.push({linhas})
            }
        }).then(async () => {
            variables.vencimentos.d7 = []
            for (const linhas of db.raw.data) {
                let now = new Date(newTimer(new Date()).fulldate)
                let vencimento = new Date(linhas.datas.vencimento)
                let timeBetween = await getTimeBetWeen(vencimento, now)
                //Set Vencimentos para daqui a 7 dias
                if (parseInt(timeBetween) === 7) variables.vencimentos.d7.push({linhas})
            }
        }).then(async () => {
            variables.vencimentos.atrasos = []
            for (const linhas of db.raw.data) {
                let now = new Date(newTimer(new Date()).fulldate)
                let vencimento = new Date(linhas.datas.vencimento)
                let timeBetween = await getTimeBetWeen(vencimento, now)
                //Set Vencimentos em Atrasos
                if (parseInt(timeBetween) < 0) variables.vencimentos.atrasos.push({linhas})
            }
        }).then(async () => {
            variables.vencimentos.d0 = []
            for (const linhas of db.raw.data) {
                let now = new Date(newTimer(new Date()).fulldate)
                let vencimento = new Date(linhas.datas.vencimento)
                let timeBetween = await getTimeBetWeen(vencimento, now)
                //Set Vencimentos em jk
                if (parseInt(timeBetween) == 0) variables.vencimentos.d0.push({linhas})
            }
        }).then(async () => {
            console.log(variables.vencimentos);
        }).catch((errs) => { console.log(errs); })
}
//Export data
module.exports = { createDueTimeLists }