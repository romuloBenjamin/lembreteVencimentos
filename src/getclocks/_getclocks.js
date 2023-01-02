//Set New Clock time
const newTimer = (data = '') => {
    let datta = new Date(data)
    let datte = `${datta.getFullYear()}/${(datta.getMonth() + 1).toString().padStart(2, '0')}/${datta.getDate().toString().padStart(2, '0')}`
    let ttime = `${datta.getHours()}:${datta.getMinutes()}:${datta.getSeconds()}`
    let fulldate = `${datte} ${ttime}`
    return {datte: datte, ttime: ttime, fulldate: fulldate}
}
//Export data
module.exports = { newTimer }