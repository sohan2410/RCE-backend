import { APIGatewayEvent, APIGatewayProxyResult, Context, APIGatewayProxyCallback } from "aws-lambda"
import { executeValidator } from "./validators/code"
import fs from "fs"
import path from "path"
import { v4 as uuid } from "uuid"
import { exec, ExecOptions } from "child_process"
import { command } from "./utils/commands"
const dir = path.join(__dirname, "../", "uploads", "codes")
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}
const options: ExecOptions = {
  timeout: 2000,
  maxBuffer: 1024 * 1024 * 250,
  killSignal: "SIGKILL",
}
const execPromise = (command: string) => {
  return new Promise(function (resolve, reject) {
    exec(command, options, (error, stdout) => {
      if (error) {
        reject(error)
        return
      }
      resolve(stdout.trim())
    })
  })
}
export const home = (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ message: "RCE serverless" }),
  })
}
export const code = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  try {
    const { format, code, input = " " } = JSON.parse(event.body || "")
    await executeValidator.validateAsync(JSON.parse(event.body || ""))
    const fileName = `${uuid()}`
    const filePath = path.join(dir, `${fileName}.${format}`)
    const inputFilePath = path.join(dir, `${fileName}.txt`)
    fs.writeFileSync(filePath, code)
    fs.writeFileSync(inputFilePath, input)

    const result = await execPromise(command(dir, fileName, format))
    return {
      statusCode: 200,
      body: JSON.stringify({ status: true, message: "File executed successfully!", result }),
    }
  } catch (error: any) {
    return {
      statusCode: 200,
      body: JSON.stringify({ status: false, message: error.message || "Something went wrong, please try again later" }),
    }
  }
}
