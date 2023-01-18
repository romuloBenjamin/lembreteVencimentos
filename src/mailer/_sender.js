//Get Ext Scripts
let variables = require("../config/config.json")
//Get Ext Scripts
let { createFiles, writeFiles, readFile } = require("../logFactory/_logfactory")
let { sendEmails } = require("./_mailer")
//Set Global Variables
let disparos = {due: {current: 0, total: 0}, transp: []}
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
    //Disparos
    disparos = {due: {current: 0, total: 0}, transp: []}
    //Variables
    variables.emails.whites = []
    variables.emails.success = []
    return variables.emails
}
//Prepare to Send E-mail
const prepareToSend = async (obj, node) => {
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
            else if (cliente.email.split('@').length >= 2) {
                let bounces = variables.emails.bounces
                if (!bounces.includes(cliente.email)) variables.emails.success.push(data)
            }
        }
    }
    //Check if E-mails to send is > 0
    if (variables.emails.success.length === 0) {
        console.log({status: 2, message: `Não localizado dados para disparos de E-mail em E-mails ${node == 'd3'? 'com vencimentos em 3 dias': 'com vencimentos em 7 dias'}`});
        return await sendLembretes(variables.vencimentos, 'd7');
    } else {
        try {
            //Variables E-mails split by 10
            variables.emails.success = spliceIntoChunks(variables.emails.success, 10)
            //Set disparos
            disparos.due.total = variables.emails.success.length
            //Execute loops
            return await loopSendVencimentos(variables.emails.success, node)
        } catch (error) {
            console.log(error);
        }
    }    
}
//Loop Send Vencimentos
const loopSendVencimentos = async (data, node) => {
    if (disparos.due.current >= (disparos.due.total - 1)) {
        if (node === 'd3') return await prepareToSend(variables.vencimentos, 'd7');
        else console.log({status: 1, message: "Finalizado processo de disparo de E-mails"})
    } else {
        console.log(`Executando Disparos de E-mails: ${disparos.due.current}/${disparos.due.total}, próximo disparo em ${(variables.variables.timeout/60)/1000} minutos, hora atual: ${new Date()}`);
        //For loop data of emails
        for (const emails of data[disparos.due.current]) disparos.transp.push(await sends(emails))
        //Add more Disparos
        disparos.due.current = disparos.due.current + 1
        setTimeout(async () => await loopSendVencimentos(data, node), variables.variables.timeout)
    }
}
/* ----------------------------------- Start MailerSend ----------------------------------- */
//Set Mails Sender
const sends = async (data) => await sendEmails(data)
/* ------------------------------------ Start Process ------------------------------------ */
//Send Lembretes de Vencimentos
const sendLembretes = async (vencimentos, node = 'd3') => {
    //Set Process to 3 days
    await prepareToSend(vencimentos[node], node);
}
//Export Modules
module.exports = { sendLembretes }