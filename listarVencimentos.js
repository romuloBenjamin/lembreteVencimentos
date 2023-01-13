//Get NPM Modules
let express = require("express")
let cors = require("cors")
//Get Ext Scripts
let variables = require("./src/config/config.json")
const { newTimer, timeBetween } = require("./src/getclocks/_getclocks")
//Get Variables
let obj = {}
//obj.timer = 3600000 //1hour
obj.timer = 10000 //5 segundos
obj.port = 3100 //porta do express
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
    obj.store = setStore(tday.datte)
    //Set Interval of senddata
    /*
    setInterval(() => {
        let cTime = newTimer(new Date())
        if (cTime.datte == obj.store) {
            setStore(cTime.datte)
            return createDueTimeLists()
        }
        console.log("...");
    }, obj.timer)
    */
}
//timers()
createDueTimeLists()
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