
const express = require("express");
const passport = require("passport");
const router = express.Router();

router.use("/login", require("./login"));
router.use("/signup", require("./signup"));
router.use("/action",passport.authenticate("jwt", { session: false }),require("./action"));
router.get("/ping", passport.authenticate("jwt", { session: false }),async function(req,res){
return  res
.status(200)
.json({ success: true,data:req, message: "pong" });
})


module.exports = router;
