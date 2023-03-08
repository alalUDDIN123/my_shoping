const dotenv = require("dotenv")
dotenv.config();
const express = require("express")
const app = express()
const ConnectDb = require("./config/Db.connect")
const cors = require("cors")
var bodyParser = require('body-parser');
const userRouter = require("./routes/user.route");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: "*"
}))

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


// All Routes
app.use("/users", userRouter)


const PORT = process.env.PORT || 8085;
app.listen(PORT, async () => {
    await ConnectDb()
    console.log(`Server running on http://localhost:${PORT}`)
})