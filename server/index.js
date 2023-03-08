const dotenv = require("dotenv")
dotenv.config();
const express = require("express")
const app = express()
const ConnectDb = require("./config/Db.connect")
const cors = require("cors")
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: "*"
}))

// All Routes


const PORT = process.env.PORT || 8085;
app.listen(PORT, async () => {
    await ConnectDb()
    console.log(`Server running on http://localhost:${PORT}`)
})