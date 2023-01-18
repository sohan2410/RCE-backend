import express from "express"
import { controller as codeController } from "../controllers/code"

const router = express.Router()

router.post("/execute", codeController.execute)

module.exports = router
