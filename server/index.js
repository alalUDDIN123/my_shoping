
// neccessery modules 👍👍👍
const dotenv = require("dotenv")
dotenv.config();
const express = require("express")
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const app = express()
const cors = require("cors")

// requiring file path 👍👍👍
const ConnectDb = require("./config/Db.connect")
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/products.route");


// neccessary middleware 👍👍👍
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

// cors origin for all browser 👍👍👍
app.use(cors({
  origin: "*"
}))


// home route 👍👍👍
app.use(express.static('public'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


// All Routes 👍👍👍
app.use("/api/users", userRouter)
app.use("/api/products", productRouter)



const PORT = process.env.PORT || 8085;
app.listen(PORT, async () => {
  await ConnectDb()
  console.log(`Server running on http://localhost:${PORT}`)
})