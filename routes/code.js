const router = require("express").Router()
const codeController = require("../controllers/code")
router.post("/execute", codeController.execute)

module.exports = router
