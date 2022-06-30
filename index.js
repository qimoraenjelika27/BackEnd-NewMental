// import module
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const openDBConnection = require("./helper/db")

// inisialisasi server
const port = process.env.PORT || 3000
const uri = process.env.MONGODB_URI
const options = {
  user : process.env.MONGODB_USER,
  pass : process.env.MONGODB_PASS
}

// function
async function main() {
  try {  
    await openDBConnection(uri, options)
    const app = express()

    // middleware
    app.use(cors())
    app.use(express.urlencoded({extended:false}))
    app.use(express.json())
    app.use(router)
    
    // server
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
  } catch (error) {
    console.log("main :", error);
  }
}

main()
