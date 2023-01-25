import { Request, Response, NextFunction } from "express"
import fs from "fs"
import path from "path"
import { v4 as uuid } from "uuid"
import { exec,ExecOptions } from "child_process"
import { executeValidator,validateBody } from "../validators/code"
import { command } from "../utils/commands"
import { pythonList as py,cList as c,cppList as cpp,javaList as java} from "../utils/blacklists"
const dir = path.join(__dirname, "../", "uploads", "codes")
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}

class Controller {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      await executeValidator.validateAsync(req.body)
      const { format, code } = req.body
      if(!validateBody(format, code)) {
        console.log(false);
        res.status(404).json({
          status:false,
          message:'You are not allowed to do this stuff...',
        })
      }
      const fileName = `${uuid()}`
      const filePath = path.join(dir, `${fileName}.${format}`)
      fs.writeFileSync(filePath, code)
      const options:ExecOptions = {
        timeout: 10000,
        killSignal: "SIGKILL"
      }
      exec(command(dir, fileName, format),options, (error, stdout, stderr) => {
        if (stdout) {
          res.status(200).json({
            status: true,
            message: "File executed successfully",
            output: stdout,
          })
          fs.unlink(filePath, (err) => {
            if (err) next(err)
          })
        } else if (stderr) {
          console.log(error)
          res.status(200).json({
            status: false,
            message: "stderr",
            error: stderr,
          })
        }
      })
    } catch (error) {
      next(error)
    }
  }
}
export const controller = new Controller()
