//Get NPM Modules
let express = require("express")
let cors = require("cors")
//Get Ext Scripts
let variables = require("./src/config/config.json")
//Get Variables
let obj = {}
//obj.timer = 3600000 //1hour
obj.timer = 300 //5 segundos
obj.port = 3100 //porta do express
/* ------------------------------------- Get new Time ------------------------------------- */
const newTimer = (data = '') => {
    let datta = new Date(data)
    let datte = `${datta.getFullYear()}/${(datta.getMonth() + 1).toString().padStart(2, '0')}/${datta.getDate().toString().padStart(2, '0')}`
    let ttime = `${datta.getHours()}:${datta.getMinutes()}:${datta.getSeconds()}`
    let fulldate = `${datte} ${ttime}`
    return {datte: datte, ttime: ttime, fulldate: fulldate}
}
/* ------------------------------------- Get BlackBox ------------------------------------- */
//Set Store date
const setStore = (data) => obj.store = data
//Create List of pays due time
const { createDueTimeLists } = require("./src/duetime/_duetimeLists.js")
/* ----------------------------------- Get TimerScripts ----------------------------------- */
//Loud Timers
const timers = async () => {
    //Pega o dia de hoje e coloca na memoria
    let tday = newTimer(new Date())
    obj.store = setStore(tday.datte);
    setInterval(() => {
        let cTime = newTimer(new Date())
        if (cTime.datte == obj.store) {
            //Set new date in store
            setStore(cTime.datte)
            return createDueTimeLists()
        }
        console.log("...")
    }, obj.timer)    
}
timers()
/* ------------------------------------ Startup Server ----------------------------------- */
//Start express
const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors({ origin: "*" })); // Run cors middleware
//Router of "to do list"
app.post('/createList', async (req, res) => createDueTimeLists(req, res))
//Start to listem to port
app.listen(obj.port)

//Export data
module.exports = { newTimer }