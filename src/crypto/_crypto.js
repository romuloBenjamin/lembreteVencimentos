//const { scrypt, randomFill, createCipheriv } = require("node:crypto");
const crypto = require("node:crypto");
let token = {};
//Empty Token
const emptyTokkens = async (data = null) => {
    if (data === null) return {}
    else {
        token.key = data.nfe.id
        token.duetime = data.datas.vencimento
        token.fatura = `${data.nfe.nfe}-${data.nfe.faturas}`
    }
    return token
}
//Encriptar in AES
const aesEncrypt = async (data, algorithm = 'aes-256-gcm') => {
    //Set Token to Empty data
    await emptyTokkens()
    token = await emptyTokkens(data)
    var mykey = crypto.createCipheriv(algorithm, '77498e9f20013221cb3a3f348a8e9f20', crypto.randomBytes(16), crypto.randomBytes(16));
    var mystr = mykey.update(JSON.stringify(token), 'utf8', 'hex')
    mystr += mykey.final('hex');    
    return mystr
}
//Encriptar by Type
const emcrypto = async (emails, crypt = 'AES') => {
    if (crypt === 'AES') return await aesEncrypt(emails)
}
//Export Modules
module.exports = { emcrypto }