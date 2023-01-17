const command = (dir, fileName, format) => {
  switch (format) {
    case "js":
      return `cd ${dir} && node ${fileName}.js`
    case "java":
      return `cd ${dir} && java ${fileName}.java`
    case "py":
      return `cd ${dir} && python ${fileName}.py`
    case "c":
      return `cd ${dir} && gcc ${fileName}.c -o a.out && bash -c "./a.out"`
    case "cpp":
      return `cd ${dir} && g++ ${fileName}.cpp -o a.out && bash -c "./a.out"`
    default:
      break
  }
}
module.exports = command
