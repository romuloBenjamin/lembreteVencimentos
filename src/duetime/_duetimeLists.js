//Get Ext Scripts
let { executeQuery, executeLoop } = require("../conexoes/database")
let { newTimer, timeBetween } = require("../getclocks/_getclocks")
let { createFiles, writeFiles } = require("../logFactory/_logfactory")
const { sendLembretes } = require("../mailer/_sender")
let variables = require("../config/config.json")
//Get Variables
let db = {}
db.raw = {}
/* ------------------------------------- Get BlackBox ------------------------------------- */
//Get SQL Boleto
const sqlBoletos = () => {
    db.sql = "SELECT `bol_data_cadastro`, `bol_destinatario`, `bol_nota`, `bol_vencimento`, `bol_fatura`, `bol_info_boleto`, `bol_code`, `nf_id`, `nf_emissao`, `nf_numero`, `nf_chave`, `nf_valor`, `des_nome`, `des_documento`, `des_email` "
    db.sql += "FROM `empresa_notas_boletos` ";
    db.sql += "INNER JOIN `empresa_notas` ON `empresa_notas_boletos`.`bol_nota` = `empresa_notas`.`nf_id` "
    db.sql += "INNER JOIN `empresa_notas_destinatarios` ON `empresa_notas_boletos`.`bol_destinatario` = `empresa_notas_destinatarios`.`des_id`"
    return db;
}
//Get SQL Boundes List - Black List
const sqlBouncesList = () => {
    db.sql2 = "SELECT `uilvb_cadastro`, `uilvb_email` FROM `uni_intra_lembrete_vencimentos_bounces`"
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
            let linhas = await executeLoop(rows)
            db.raw.data = linhas.linhas
        }).then(async () => {
            variables.vencimentos.d3 = []
            await createFiles('vencimentos-3-dias')
            for (const linhas of db.raw.data) {
                let now = new Date(newTimer(new Date()).fulldate)
                let vencimento = new Date(linhas.datas.vencimento)
                let timebetween = await timeBetween(vencimento, now)
                //Set Vencimentos para daqui a 3 dias
                if (parseInt(timebetween) === 3) variables.vencimentos.d3.push({linhas})
            }
        }).then(async () => {
            variables.vencimentos.d7 = []
            await createFiles('vencimentos-7-dias')
            for (const linhas of db.raw.data) {
                let now = new Date(newTimer(new Date()).fulldate)
                let vencimento = new Date(linhas.datas.vencimento)
                let timebetween = await timeBetween(vencimento, now)
                //Set Vencimentos para daqui a 7 dias
                if (parseInt(timebetween) === 7) variables.vencimentos.d7.push({linhas})
            }
        }).then(async () => {
            variables.vencimentos.atrasos = []
            await createFiles('vencimentos-atrasos')
            for (const linhas of db.raw.data) {
                let now = new Date(newTimer(new Date()).fulldate)
                let vencimento = new Date(linhas.datas.vencimento)
                let timebetween = await timeBetween(vencimento, now)
                //Set Vencimentos em Atrasos
                if (parseInt(timebetween) < 0) variables.vencimentos.atrasos.push({linhas})
            }
        }).then(async () => {
            variables.vencimentos.d0 = []
            await createFiles('vencimentos-de-hoje')
            for (const linhas of db.raw.data) {
                let now = new Date(newTimer(new Date()).fulldate)
                let vencimento = new Date(linhas.datas.vencimento)
                let timebetween = await timeBetween(vencimento, now)
                //Set Vencimentos em jk
                if (parseInt(timebetween) == 0) variables.vencimentos.d0.push({linhas})
            }
        }).then(async () => {
            //Create File depicturing due time till 3 days
            await writeFiles("vencimentos-3-dias" , {"vencimentos": variables.vencimentos.d3})
            //Create File depicturing due time till 7 days
            await writeFiles("vencimentos-7-dias" , {"vencimentos": variables.vencimentos.d7})
            //Create File depicturing due time today
            await writeFiles("vencimentos-de-hoje" , {"vencimentos": variables.vencimentos.d0})            
            //Create File depicturing due already blowup
            await writeFiles("vencimentos-atrasos" , {"vencimentos": variables.vencimentos.atrasos})
            //Stdout
            console.log("Gerado os Vencimentos para 0, 3, 7 e atrasos!");
        }).then(async () => sendLembretes(variables.vencimentos))
        .catch((errs) => { console.log(errs); })
}
//Create List of Boundes -> black list
const createBoundeList = async () => {
    //Get SQL data
    let sql = sqlBouncesList()
    await executeQuery(sql.sql2, '', 'uni_intra')
        .then(async ([rows, fields]) => {
            let bounces = await executeLoop(rows, 'blackList')
            db.raw.bounces = bounces.bounces
        }).then(async () => {
            variables.emails.bounces = []
            await createFiles('bouncesList')
            for (const bounce of db.raw.bounces) variables.emails.bounces.push(bounce);            
        }).then(async () => {
            //Write Bounce List, black list
            await writeFiles('bouncesList', {"bounces": variables.emails.bounces})
        }).then(async () => console.log(variables.emails.bounces))
        .catch((errs) => console.log(errs))
}
//Export data
module.exports = { createDueTimeLists, createBoundeList }