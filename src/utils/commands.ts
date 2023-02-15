export const command = (dir: string, fileName: string, format: string): string => {
  console.log("commands", dir, fileName, format)
  switch (format) {
    case "js": //done
      return `cd ${dir} && node ${fileName}.js < ${fileName}.txt`
    case "java": //done
      return `cd ./bin && bash -c "./java /tmp/${fileName}.java < /tmp/${fileName}.txt"`
    case "py": //done
      return `cd ./bin && bash -c "./python3.8 /tmp/${fileName}.py < /tmp/${fileName}.txt"`
    case "c":
      return `cd ./bin && bash -c "./gcc /tmp/${fileName}.c -o a.out" && bash -c "./a.out < ${fileName}.txt"`
    // return `cd ${dir} && gcc ${fileName}.c -o a.out && bash -c "./a.out < ${fileName}.txt"`
    case "cpp":
      return `cd ${dir} && g++ ${fileName}.cpp -o a.out && bash -c "./a.out < ${fileName}.txt"`
    default: {
      const err = new Error(`command not found: ${fileName}`)
      err.name = "CommandError"
      throw err
    }
  }
}
