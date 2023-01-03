//Get NPM Modules
//SendMailer
const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const Attachment = require("mailersend").Attachment;
const MailerSend = require("mailersend");
//Get Ext Scripts
//Send Lembretes de Vencimentos
const sendLembretes = async () => {}
//Export Modules
module.exports = { sendLembretes }