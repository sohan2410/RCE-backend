import express, { Request, Response, Application } from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { errorHandler } from "./middlewares/exceptions/handler"
import code from "./routes/code"
const app: Application = express()

// const port = Number(process.env.PORT) || 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors<Request>())

app.use("/api/code", code)

app.get("/", (_, res: Response) => {
  res.status(200).json({
    status: true,
    message: "Server is listening for requests",
  })
})
app.use((_: Request, res: Response) => {
  res.send({ message: "Server is running" })
})
app.use(errorHandler)

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`)
// })
export default app
