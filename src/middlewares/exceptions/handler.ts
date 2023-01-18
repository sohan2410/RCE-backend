import { ErrorRequestHandler, Response } from "express"

export const errorHandler: ErrorRequestHandler = (err, _, res: Response, __) => {
  console.log(err, typeof err.message)
  return res.status(err.status || 500).json({
    status: false,
    message: err.errors || err.message || "Something went wrong, please try again.",
  })
}
