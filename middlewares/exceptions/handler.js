const errorHandler = (err, _, res, __) => {
  console.log(err, typeof err.message)
  res.status(err.status || 500).json({
    status: false,
    message: err.errors || err.message || "Something went wrong, please try again.",
  })
}
module.exports = errorHandler
