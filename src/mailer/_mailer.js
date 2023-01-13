//Get NPM Modules
const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const Attachment = require("mailersend").Attachment;
const MailerSend = require("mailersend");
const { JSDOM } = require('jsdom')
/* ------------------------------------- Get BlackBox ------------------------------------- */
//Get MailerSend Api
const mailConfig = async (obj) => {
    /* //GMAIL DADOS
    return nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        debug: true,
        auth: {
            user: 'sales.cleaner.externo@gmail.com',
            pass: "sijchcccjefvimkm"
        }
    }); */
    //MailerSend dados
    return new MailerSend({api_key: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZWQxZjA0MThjODY3MGIxMDU1MjE4ZWJjN2MyZGNlNmM2NDNlNWFiMWE3MzU0Y2E3YTAyN2RlMzNiOGZkYjAwM2Y4NDZjNGViOGU4NGRhZTgiLCJpYXQiOjE2NzM0NDU4NDUuNzExMTE2LCJuYmYiOjE2NzM0NDU4NDUuNzExMTE5LCJleHAiOjQ4MjkxMTk0NDUuNzA2ODY4LCJzdWIiOiIzODY0MSIsInNjb3BlcyI6WyJlbWFpbF9mdWxsIiwiZG9tYWluc19yZWFkIiwiYWN0aXZpdHlfcmVhZCIsInRva2Vuc19mdWxsIiwidGVtcGxhdGVzX2Z1bGwiLCJpbmJvdW5kc19mdWxsIiwicmVjaXBpZW50c19yZWFkIiwic2VuZGVyX2lkZW50aXR5X3JlYWQiXX0.ZF471Rl_zJTrh2W7EsyPdXqGb-0dEwv1BrB4sJIEUbFWPqG-Bp2aHt2M_E7Bb5_GOM8oGPjgZCWMTQy5W5bB0ebfmXz_uye98SeUXtOWJGhpCZ12xnPrAvQfaeiT6vwl8_ZxXpaO0CyN5pPp9qAIRsiZ2kAGOJqL6zd8-t3Jcg0RV6XHpKGpLpcB1vfnoKrZ-9mzt__3fZ1iR4px4BbB7UNWjeZmXXxrFo14JDDyfRUtSz1YznUqviQchLtWbvkBKHzEcCP9Tx0h7nGnLoUI0e383bBvkSmMIozVDohuKJ5lschc2Ol0GCpQvQApQj4qgIqSWiV2srzG9OkLhTNDTsAdwt5s2QdRMKtzHyBs0es5-Ed2-XYcsF4Nb4wZ-a3FtTuCSVAvXTBAJbUvykTl729AzeXaRWrRquAKWOay_xzFeQLUXAT0pWo5DBuwUHEdMPmTB4BEaAK-7nv0WyJGP5zmMc7MifwaTbD1B70SCxph3tIG00ZkC5abCODx2QmE4ut8JzuWr2chbjeKub2kAXt61QKFLiJfVezZ3ySU2d13P-zJ6bTgwx19RAc9TTNNqaOlju8nw8wmkoW4_48TdXVwTBW0PuxvoiyDlwkUAmy3xQxMRoVEqK75KOdDk1rzOUuHWxZZRgiiCgXTq3dQ3GA0ryuEDMBPMBjHx7q3byQ"});
}
//
const setTemplate = async (emails) => {
    let ddatta = new Date(emails.datas.vencimento)
    let dds = {
        cliente: emails.cliente.nome, 
        nfe: emails.nfe, 
        vencimento: `${ddatta.getDate().toString().padStart(2, '0')}/${(ddatta.getMonth() + 1).toString().padStart(2, '0')}/${ddatta.getFullYear()}`,
        bol: ""
    }
    //Create HTML
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
                                        <td><img style="width:auto;height:120px;" src="http://162.241.88.255/~wwsale/images/sales_logo.png"></td>
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
                                                <strong id="cliente"></strong>
                                                <p>A data de vencimento do seu boleto está se aproximando, para facilitar o pagamento estamos informando abaixo as Notas Fiscais que constam registradas em nosso sistema, bem como os respectivos valores, vencimentos e parcelas.</p>                
                                                <strong id="nfen"></strong>
                                                <strong id="vencimento"></strong>
                                                <br>
                                                <br>
                                                <br>
                                                <p><a id="buttonLink" href="#">Gerar Boleto</a></p>
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
                                                <p style="margin: .25rem 0;">Sales Distribuidora  - Todos os direitos reservados</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>                                            
                                                <p style="margin: .25rem 0;">R. Palmeria de Batuá 199, Jardim Eliane, São Paulo - SP - CEP 03575110</p>
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
    </html>`;
    //Ajustar Doms
    try {
        let doms = new JSDOM(template)
        doms.window.document.getElementById("cliente").innerHTML = dds.cliente
        doms.window.document.getElementById("nfen").innerHTML = dds.nfe
        doms.window.document.getElementById("vencimento").innerHTML = `Vencimento: ${dds.vencimento}`
        doms.window.document.getElementById("buttonLink").setAttribute('href', "dados.bol.toString('utf8')")
        //Responser
        return doms.window.document.querySelector("html").outerHTML        
    } catch (error) {
        return error
    }
}
//
const transporters = async () => {
    const transporter = await mailConfig()
    return transporter
}
/* ----------------------------------- Start MailerSend ----------------------------------- */
//SendEmails by
const sendEmails = async (emails, transps) => {
    //Set Template
    const templete = await setTemplate(emails)
    console.log(templete);
    /*
    //Get Recipients
    //const recipients = [new Recipient(emails.cliente.email, emails.cliente.nome)];
    const recipients = [new Recipient("romulo.b.franco@hotmail.com", "Romulo Franco")];
    //Send E-mail
    const emailParams = new EmailParams()
        .setFrom("lembrete.vencimento@contatosales.com.br")
        .setFromName("Contato Sales")
        .setRecipients(recipients)          
        .setSubject("Lembrete de Vencimentos")
        .setHtml(templete)
        .setText("text");
    try {
        transps.send(emailParams);
        return {status: 1, message: `E-mail enviado com Sucesso! -> ${emails.cliente.email}`, log: JSON.stringify(emailParams)}
    } catch (error) {
        return {status: 0, message: `Erro ao enviar lembrete -> ${error}, E-mail, -> ${emails.cliente.email}\n`, error: JSON.stringify(emailParams)}
    }
    */
}

module.exports = { sendEmails, transporters }