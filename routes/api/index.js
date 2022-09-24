
const express = require("express");
const passport = require("passport");
const router = express.Router();

router.use("/login", require("./login"));
router.use("/signup", require("./signup"));
router.use("/action",require("./action"));
router.get("/ping", passport.authenticate("jwt", { session: false }),async function(req,res){
    console.log(req)
return  res
.status(422)
.json({ success: false,data:req, message: "invalid username or password" });
})


module.exports = router;
