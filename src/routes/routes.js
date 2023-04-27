const express = require("express")
const router = express.Router()
const  {startServer,stopServer}  = require("../controller/gmail")

router.get("/startserver", startServer)
router.get("/stopserver",stopServer)

module.exports = router;