const express = require("express");
const { signIn } = require("../controllers/authControllers");
const router = express.Router();

router.get("/", signIn);

module.exports = router;
