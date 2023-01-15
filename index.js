require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const bodyParser = require("body-parser")
// const db = require("./configs/db")

const port = process.env.PORT || 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

app.use("/api/code", require("./routes/code"))

app.get("/", (_, res) => {
  res.send("Server is listening for requests")
})

app.use(require("./middlewares/exceptions/handler"))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

// db()
