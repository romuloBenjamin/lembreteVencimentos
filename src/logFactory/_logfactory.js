//Get NPM Modules
const fs = require("fs")
//Get Ext Scripts
const variables = require("../config/config.json")
/* ------------------------------------ Start Process ------------------------------------ */
//Create Folder Logs
const createLogFolder = () => {
    if (!fs.existsSync(`${variables.variables.paths.dir}logs`)) fs.mkdirSync(`${variables.variables.paths.dir}logs`)
}
createLogFolder()
/* ------------------------------------- Get BlackBox ------------------------------------- */
//Create Files
const createFiles = async (fileName = '', extensions = '.json') => {
    if (fileName == '') return;
    if (!fs.existsSync(`${variables.variables.paths.dir}logs/${fileName + extensions}`)) return fs.createReadStream(`${variables.variables.paths.dir}logs/${fileName + extensions}`)
}
//Write File
const writeFiles = async (file, content, extensions = '.json') => fs.writeFileSync(`${variables.variables.paths.dir}logs/${file + extensions}`, JSON.stringify(content))
//Read File
const readFile = async (file, extensions = '.json') => fs.readFileSync(`${variables.variables.paths.dir}logs/${file + extensions}`)
//Export data
module.exports = { createFiles, writeFiles, readFile}
//