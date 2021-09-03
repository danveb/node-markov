/** Command-line tool to generate Markov text. */

const fs = require('fs') 
const process = require('process') 
const axios = require('axios') 
const { MarkovMachine } = require('./markov')

// generateText(text) 
function generateText(text) {
    let mm = new MarkovMachine(text) 
    console.log(mm.makeText()) 
}

// makeText 
function makeText(path) {
    fs.readFile(path, 'utf-8', (err, data) => {
        if(err) {
            console.log(`Error reading file ${path}, ${err}`) 
            process.exit(1) 
        }
        generateText(data) 
    })
}

// makeURLText 
async function makeURLText(url) {
    try {
        let response = await axios.get(url) 
        return generateText(response.data) 
    } catch(err) {
        console.log(`Error with ${url}: ${err}`)
    }
}

let [method, path] = process.argv.slice(2) 
if(method === 'file') {
    makeText(path) 
} else if(method === 'url') {
    makeURLText(path) 
} 