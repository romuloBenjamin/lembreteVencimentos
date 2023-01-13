//Get Ext Scripts
let variables = require("../config/config.json")
//Get Ext Scripts
let { createFiles, writeFiles, readFile } = require("../logFactory/_logfactory")
let { sendEmails, transporters } = require("./_mailer")
let disparos = {d3: {current: 0, total: 0}, d7: {current: 0, total: 0}, transp: {}}
/* ------------------------------------- Get BlackBox ------------------------------------- */
//splice into Chunks
const spliceIntoChunks = (arr, chunkSize) => {
    const res = [];
    while (arr.length > 0) {
        const chunk = arr.splice(0, chunkSize);
        res.push(chunk);
    }
    return res;
}
//Empty Variables
const emptyVariables = async () => {
    variables.emails.whites = []
    variables.emails.bounces = []
    variables.emails.success = []
    return variables.emails
}
//Prepare to Send E-mail
const prepareToSend = async (obj, type) => {
    //Empty data Before Run Vencimentos
    await emptyVariables()    
    //Set loopdata for
    for (const vencimentos in obj) {
        if (Object.hasOwnProperty.call(obj, vencimentos)) {
            const data = obj[vencimentos].linhas
            const cliente = data.cliente
            //What to do inf cliente E-mail
            if (cliente.email == '' || cliente.email == null || cliente.email == undefined) variables.emails.whites.push({cliente: `${cliente.name} ${cliente.cnpj}`, message: "E-mail Vazio!"})
            else if (cliente.email.split('@').length <= 1) variables.emails.whites.push({cliente: `${cliente.name} ${cliente.cnpj}`, message: "Não localizado o '@' no email do cliente!"})
            else if (cliente.email.split('@').length >= 2) variables.emails.success.push(data)
        }
    }
    //Variables E-mails split by 10
    variables.emails.success = spliceIntoChunks(variables.emails.success, 10)
    //Set disparos
    disparos[type].total = variables.emails.success.length
    //Set Transporters
    disparos.transp = await transporters()
    //Execute loops
    await loopSendVencimentos(variables.emails.success, disparos[type])
}
//Loop Send Vencimentos
const loopSendVencimentos = async (data, disp) => {
    if (disp.current >= disp.total) console.log({status: 1, message: "Finalizado processo de disparo de E-mails"})
    else {
        //For loop data of emails
        for (const emails of data[disp.current]) await sends(emails)
        disp.current = disp.current + 1
        await loopSendVencimentos(data, disp)
    }
}
/* ----------------------------------- Start MailerSend ----------------------------------- */
//Set Mails Sender
const sends = async (data) => {
    return await sendEmails(data, disparos.transp)
}
/* ------------------------------------ Start Process ------------------------------------ */
//Send Lembretes de Vencimentos
const sendLembretes = async (vencimentos) => {
    console.log("iniciando processo de disparos de e-mail");
    //Set Process to 3 days
    await prepareToSend(vencimentos.d3, "d3");
    //Set Process to 7 days
    await prepareToSend(vencimentos.d7, "d7");
}
//Export Modules
module.exports = { sendLembretes }