//Get NPM Modules
const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");
//Add Cripto JS
let { createStatusSender } = require("../logFactory/_logfactory")
const { emcrypto } = require("../crypto/_crypto")
/* ------------------------------------- Get BlackBox ------------------------------------- */
//Get MailerSend Api
const mailConfig = async () => {
    //MailerSend dados
    return new MailerSend({api_key: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMmY1NmI5OTEwNmMxMjdlODMwYzFjNGI5ZWRjMWRlMzBiOTU1OWVjNGFhMjY2NWI2MTU2MGJkN2M4ZWVkMjU1NTAwZGY3Y2JiYWUxOWQ1MjciLCJpYXQiOjE2NzM4NzI5NzIuNjU5NDM4LCJuYmYiOjE2NzM4NzI5NzIuNjU5NDQxLCJleHAiOjQ4Mjk1NDY1NzIuNjU1NjkxLCJzdWIiOiIzODY0MSIsInNjb3BlcyI6WyJlbWFpbF9mdWxsIiwiZG9tYWluc19yZWFkIiwiYWN0aXZpdHlfcmVhZCIsImFuYWx5dGljc19yZWFkIiwidG9rZW5zX2Z1bGwiLCJ0ZW1wbGF0ZXNfZnVsbCIsImluYm91bmRzX2Z1bGwiLCJyZWNpcGllbnRzX3JlYWQiXX0.SmiOHsbCL4w062x2SktNuQ6UkyrmfrW66posGl7tf4uLFt6JdbikWGJeKFfP-OQEEBzlQdqWtuDG8Xs2nWFQ7zE9-ycoNXeFdvcAbmNMGJDUSbhbFL2RnPPboGif84D4XOIM6zzpY83dSe2y8VuyTGbaM2kX5WLpHU_zR6GiICUDjpAzhIqe1M36hsYNzvkvvZa0gxEECZ4PKxv618v8vhmhhXGut3WNV3EAwQCSVH2H-LuEXYZrh8ItRXYqsMoJhLHfmNjKA5BcmFi4BLJXXck2uRj8Rcwe4rcf73JuErNO2BRomR5ZGWnPYywBrtJJBh3pnXh3NzWVwLf8evkbtsDC3OhFZaNtj_sUGeil5--h32zDwMAuNAjiUS9Bdajk5lE4C1oAAtA6P38HFdd1dvQdqS_xRkRgmnpLAF6E0iX5x_1_X2iAtImbrwYoROhoUy-J4v5NymL4nFq2Zq7C0UrFKM9fH0neCAYT3xlHw68pFd9BEHXwz-5elcdiGmLSfY415bZdxmbHiDESr9p-sUaxf4PYP7M26XmfZ17gfsIyNbiWE-FvVG0U_G9cVhvVHEV_L2fCk88M15hK-A90PNutM9-fqjf-wbtSeWK_RSb2DUcYBvcWsp-fG7KNhe7Lxrr5ADQpVgtJ76EkEbEk4CB__9gG6QpXCwqizfBRPLA"});
}
//Emails Variables
const variablesEmails = async (emails) => {
    //Get Data
    let ddatta = new Date(emails.datas.vencimento)
    //Set Dados 'dd'
    let dd = { 
        cliente: emails.cliente.nome,
        nfen: emails.nfe.nfe, 
        vencimento: `${ddatta.getDate().toString().padStart(2, '0')}/${(ddatta.getMonth() + 1).toString().padStart(2, '0')}/${ddatta.getFullYear()}`
    }
    //complementar 'blink' ao 'dd'
    dd.blink = await emcrypto(emails)
    return dd
}
//Set Template to HTML E-mails
const htmlTemplate = async (emails) => {
    let dd = await variablesEmails(emails)
    //Create Obj dds
    let template = `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <style type="text/css">
            @media only screen and (max-width: 480px) {
                body {font-family: "Montserrat", sans-serif;font-size: 1rem;}
                body {width: 100%;height: 100%;min-height: 100vh;}
                @font-face {font-family: "Metropolis Bold";src: url("http://162.241.88.255/~wwsale/wwexterno/css/fonts-metropolis/Metropolis-Bold.otf");src: url("http://162.241.88.255/~wwsale/wwexterno/css/fonts-metropolis/Metropolis-Bold.otf") format("otf");src: url("http://162.241.88.255/~wwsale/wwexterno/css/fonts-metropolis/Metropolis-Bold.otf") format("opentype");font-display: swap;}
                @font-face {font-family: "Metropolis Regular";src: url("http://162.241.88.255/~wwsale/wwexterno/css/fonts-metropolis/Metropolis-Regular.otf");src: url("http://162.241.88.255/~wwsale/wwexterno/css/fonts-metropolis/Metropolis-Regular.otf") format("otf");src: url("http://162.241.88.255/~wwsale/wwexterno/css/fonts-metropolis/Metropolis-Regular.otf") format("opentype");font-display: swap;}
                @font-face {font-family: "Metropolis Thin";src: url("http://162.241.88.255/~wwsale/wwexterno/css/fonts-metropolis/Metropolis-Thin.otf");src: url("http://162.241.88.255/~wwsale/wwexterno/css/fonts-metropolis/Metropolis-Thin.otf") format("otf");src: url("http://162.241.88.255/~wwsale/wwexterno/css/fonts-metropolis/Metropolis-Thin.otf") format("opentype");font-display: swap;}
                @font-face {font-family: "Metropolis Light";src: url("http://162.241.88.255/~wwsale/wwexterno/css/fonts-metropolis/Metropolis-Light.otf");src: url("http://162.241.88.255/~wwsale/wwexterno/css/fonts-metropolis/Metropolis-Light.otf") format("otf");src: url("http://162.241.88.255/~wwsale/wwexterno/css/fonts-metropolis/Metropolis-Light.otf") format("opentype");font-display: swap;}
                body {margin: 0;padding: 0;width: 100vw;height: 100vh;}
            }
            #buttonLink { border: 2px ridge #0a0933;text-decoration: none;background: #3d3dbf;border-radius: .35rem;padding: .5rem .6rem;color: #fff; }
        </style>
        <div style="width: 90vw; height: auto; display: block;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 80vw;height:100vh;">
                <tbody>
                    <tr id="header">
                        <td style="padding: 0; direction: ltr;font-size: 0px;text-align: center;height:5%;">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 80%;height: 100%;">
                                <tbody>
                                    <tr>
                                        <td style="vertical-align: baseline;"> <div id="headerBlue" style="
                                            background: #30537e;
                                            display: block;
                                            margin: 0 auto;
                                            border-bottom-left-radius: 12pt;
                                            border-bottom-right-radius: 12pt;
                                            height: 40px;
                                            width: 80%;
                                            "></div> </td>
                                    </tr>
                                </tbody>
                            </table>    
                        </td>
                    </tr>
                    <tr id="logo">
                        <td style="padding: 0;direction: ltr;font-size: 0px;text-align: center;height:13%;">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 80%;height: 100%;">
                                <tbody>
                                    <tr>
                                        <td align="center"><img style="width:auto;height:120px;" src="http://162.241.88.255/~wwsale/images/sales_logo.png"></td>
                                    </tr>
                                </tbody>
                            </table>    
                        </td>
                    </tr>
                    <tr id="message">
                        <td style="padding: 0;direction: ltr;font-size: 19pt;text-align: center;height: 25%;">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 80%;height: 100%;">
                                <tbody>
                                    <tr>
                                        <td style="vertical-align: bottom;">
                                            <div style="width: 80%;margin: 0 auto;">
                                                <p>Olá,</p>
                                                <strong id="cliente">${dd.cliente}</strong>
                                                <p>A data de vencimento do seu boleto está se aproximando, para facilitar o pagamento estamos informando abaixo as Notas Fiscais que constam registradas em nosso sistema, bem como os respectivos valores, vencimentos e parcelas.</p>                
                                                <strong id="nfen">${dd.nfen}</strong> - <strong id="vencimento">${dd.vencimento}</strong>
                                                <br>
                                                <br>
                                                <br>
                                                <p><a id="buttonLink" href="https://sales.com.br/boleto-lembrete-vencimento?token=${dd.blink}">Gerar Boleto</a></p>
                                                <br>
                                                <p>Caso este boleto já tenha sido recebido anteriormente, favor desconsiderar esta mensagem</p>
                                                <br>
                                                <br>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>    
                        </td>
                    </tr>
                    <tr id="warnings">
                        <td style="padding: 0;direction: ltr;font-size: 16pt;text-align: left;height: 25%;">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 64%;height: 100%;">
                                <tbody>
                                    <tr><td><b>Evite fraudes, verifique sempre:</b></td></tr>
                                    <tr><td></td></tr>
                                    <tr><td><b>Nome do beneficiário:</b> Confirme se o nome da pessoa ou da empresa é de quem realmente deve receber o valor.</td></tr>
                                    <tr><td><b>Código de barras:</b> Confira o código de barras, lembrando que os últimos dígitos se referem ao valor total do boleto.</td></tr>
                                    <tr><td><b>Valor:</b> Confirme o valor a ser pago.</td></tr>
                                    <tr><td><b>Data de vencimento e erros ortográficos:</b> Boletos falsos geralmente apresentam data de vencimento alterada e erros ortográficos</td></tr>
                                    <tr><td><b>Rasuras:</b> Boletos falsos de papel podem apresentar indícios de alteração ou rasuras, principalmente no código de barras e em sua numeração.</td></tr>
                                </tbody>
                            </table>    
                        </td>
                    </tr>
                    <tr style="height: 70pt;"></tr>
                    <tr id="footer">
                        <td style="padding: 0;direction: ltr;font-size: 16px;text-align: center;height:8%;"">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 80%;height: 100%;">
                                <tbody>
                                    <tr>
                                        <td>
                                            <div>
                                                <p style="text-align: center;margin: .25rem 0;">Sales Distribuidora  - Todos os direitos reservados</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>                                            
                                                <p style="text-align: center;margin: .25rem 0;">R. Palmeria de Batuá 199, Jardim Eliane, São Paulo - SP - CEP 03575110</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>    
                        </td>
                    </tr>
                </tbody>
            </table>        
        </div> 
    </body>
    </html>`
    return template
}
//Set Template to Text E-mails
const textTemplate = async (emails) => {
    let dd = await variablesEmails(emails)
    //Create Obj dds
    let template = `Olá ${dd.cliente}, este é um e-mail de lembrete de vencimento, referente a NFE: ${dd.nfen}, ao qual esta para vencer em: ${dd.vencimento}. Caso não tenha o boleto acesse nosso site: "https://sales.com.br/login".`
    return template    
}
/* ----------------------------------- Start MailerSend ----------------------------------- */
//SendEmails by
const sendEmails = async (emails) => {
    //Set date Vencimento + HJ
    let tdays = {}
    tdays.hj = new Date()
    tdays.pt = new Date(emails.datas.vencimento)
    tdays.fileSuccess = `disp-${tdays.hj.getFullYear() + (tdays.hj.getMonth() + 1).toString().padStart(2, '0') + tdays.hj.getDate().toString().padStart(2, '0')}-venc-${tdays.pt.getFullYear() + (tdays.pt.getMonth() + 1).toString().padStart(2, '0') + tdays.pt.getDate().toString().padStart(2, '0')}-enviados`
    tdays.fileFailure = `disp-${tdays.hj.getFullYear() + (tdays.hj.getMonth() + 1).toString().padStart(2, '0') + tdays.hj.getDate().toString().padStart(2, '0')}-venc-${tdays.pt.getFullYear() + (tdays.pt.getMonth() + 1).toString().padStart(2, '0') + tdays.pt.getDate().toString().padStart(2, '0')}-falhas`
    //Set Transporters
    const transporter = await mailConfig();
    //Set Template HTML
    const templateHTML = await htmlTemplate(emails)
    //Set Template Text
    const templateText = await textTemplate(emails)
    //Get Recipients
    const recipients = [new Recipient(emails.cliente.email, emails.cliente.nome)];
    //Send E-mail
    const emailParams = new EmailParams()
            .setFrom("lembrete.vencimento@contatosales.com.br")
            .setFromName("Contato Sales")
            .setRecipients(recipients)
            .setSubject("Lembrete de Vencimentos")
            .setHtml(templateHTML)
            .setText(templateText)
            try {                
                //transporter.send(emailParams)
                createStatusSender(JSON.stringify(emailParams), tdays.fileSuccess, '.txt')
                return {status: 1, message: `E-mail enviado com Sucesso! -> ${emails.cliente.email}`, log: JSON.stringify(emailParams)}
            } catch (error) {
                createStatusSender(JSON.stringify(error), tdays.fileFailure, '.txt')
                return {status: 0, message: `Erro ao enviar lembrete -> ${error}, E-mail, -> ${emails.cliente.email}\n`, error: JSON.stringify(emailParams)}
            }
}
//Export Modules
module.exports = { sendEmails }