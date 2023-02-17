import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda"
import fs from "fs"
import path from "path"
import { exec, ExecOptions } from "child_process"

const dir = path.join(__dirname, "uploads", "codes")
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}
const options: ExecOptions = {
  timeout: 5000,
  maxBuffer: 1024 * 1024 * 250,
  killSignal: "SIGKILL",
}

const execPromise = (command: string) => {
  return new Promise(function (resolve, reject) {
    exec(command, (error, stdout) => {
      if (error) {
        reject(error)
        return
      }
      resolve(stdout.trim())
    })
  })
}

const command = (dir: string, fileName: string, format: string): string => {
  switch (format) {
    case "c":
      return `cd ${dir} && bash -c "gcc ${fileName}.c"`
    case "cpp":
      return `cd ${dir} && bash -c "g++ ${fileName}.cpp -o a.out" && bash -c "./a.out < ${fileName}.txt"`
    case "js":
      return `cd ${dir} && bash -c "node ${fileName}.js < ${fileName}.txt"`
    case "java":
      return `cd ${dir} && bash -c "java ${fileName}.java < ${fileName}.txt"`
    case "py":
      return `cd ${dir} && bash -c "python3 ${fileName}.py < ${fileName}.txt"`
    default: {
      const err = new Error(`command not found: ${fileName}`)
      err.name = "CommandError"
      throw err
    }
  }
}

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  try {
    const { format, code, input = " " } = JSON.parse(event.body || "")
    const fileName = "code"
    const filePath = path.join(dir, `${fileName}.${format}`)
    const inputFilePath = path.join(dir, `${fileName}.txt`)
    fs.writeFileSync(filePath, code)
    fs.writeFileSync(inputFilePath, input)

    const result = await execPromise(command(dir, fileName, format))
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ status: true, message: "File executed successfully!", result }),
    }
  } catch (error: any) {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ status: false, message: error.message || "Something went wrong, please try again later", error }),
    }
  }
}
