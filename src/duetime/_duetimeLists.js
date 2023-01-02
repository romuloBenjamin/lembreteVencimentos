//Get NPM Modules
let { executeQuery } = require("../conexoes/database")
//Get Ext Scripts
let variables = require("../config/config.json")
//Get Variables

/* ------------------------------------- Get BlackBox ------------------------------------- */
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
const createDueTimeLists = () => {
    
}
//Export data
module.exports = { createDueTimeLists }