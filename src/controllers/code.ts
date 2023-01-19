import { Request, Response, NextFunction } from "express"
import fs from "fs"
import path from "path"
import { v4 as uuid } from "uuid"
import { exec } from "child_process"
import { executeValidator } from "../validators/code"
import { command } from "../utils/commands"
const dir = path.join(__dirname, "../", "uploads", "codes")
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}

class Controller {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      await executeValidator.validateAsync(req.body)
      const { format, code } = req.body
      const fileName = `${uuid()}`
      const filePath = path.join(dir, `${fileName}.${format}`)
      fs.writeFileSync(filePath, code)
      exec(command(dir, fileName, format), (error, stdout, stderr) => {
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
