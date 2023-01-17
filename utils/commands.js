const command = (dir, fileName, format) => {
  switch (format) {
    case "js":
      return `cd ${dir} && node ${fileName}`
    case "java":
      return `cd ${dir} && java ${fileName}`
    case "py":
      return `cd ${dir} && python ${fileName}`
    case "c":
      return `cd ${dir} && gcc ${fileName}`
    case "cpp":
      return `cd ${dir} && gcc ${fileName}`
    default:
      break
  }
}
module.exports = command
