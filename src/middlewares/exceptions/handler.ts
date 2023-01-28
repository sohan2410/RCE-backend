import { ErrorRequestHandler, Response } from "express"

export const errorHandler: ErrorRequestHandler = (err: Error, _, res: Response, __) => {
  process.env.NODE_ENV !== "development" && console.log("Error handler==>\n", err)
  switch (err.name) {
    case "ValidationError":
      return res.status(200).json({
        status: false,
        message: err.message || "Validation error",
      })
    default:
      return res.status(500).json({
        status: false,
        message: err.message || "Something went wrong, please try again.",
      })
  }
}
