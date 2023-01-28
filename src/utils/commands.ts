export const command = (dir: string, fileName: string, format: string): string => {
  switch (format) {
    case "js":
      return `cd ${dir} && node ${fileName}.js < ${fileName}.txt`
    case "java":
      return `cd ${dir} && java ${fileName}.java < ${fileName}.txt`
    case "py":
      return `cd ${dir} && bash -c "python ${fileName}.py < ${fileName}.txt"`
    case "c":
      return `cd ${dir} && gcc ${fileName}.c -o a.out && bash -c "./a.out < ${fileName}.txt"`
    case "cpp":
      return `cd ${dir} && g++ ${fileName}.cpp -o a.out && bash -c "./a.out < ${fileName}.txt"`
    default:
      const err = new Error(`command not found: ${fileName}`)
      err.name = "CommandError"
      throw err
  }
}
