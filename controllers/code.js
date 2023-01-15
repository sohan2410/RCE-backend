const fs = require("fs")
const path = require("path")
const { v4: uuid } = require("uuid")
const { executeValidator } = require("../validators/code")
const { exec } = require("child_process")
const dir = path.join(__dirname, "../", "uploads", "codes")
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}
class Controller {
  async execute(req, res, next) {
    try {
      await executeValidator.validateAsync(req.body)
      const { format, code } = req.body
      const fileName = `${uuid()}.${format}`
      const filePath = path.join(dir, fileName)
      fs.writeFileSync(filePath, code)
      switch (format) {
        case "js":
          console.log(filePath)
          exec(`cd ${dir} && node ${fileName}`, (error, stdout, stderr) => {
            console.log(error, stdout, stderr)
            if (error) throw error
            if (stdout) {
              res.status(200).json({
                status: true,
                message: "File executed successfully",
                output: stdout,
              })
            } else if (stderr) {
              res.status(200).json({
                status: false,
                message: "stderr",
              })
            }
          })
          break
        default:
          res.status(200).json({
            status: false,
            message: "Invalid format",
          })
          break
      }
    } catch (error) {
      next(error)
    }
  }
}
module.exports = new Controller()
