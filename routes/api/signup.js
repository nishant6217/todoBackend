const express = require("express");

const router = express.Router();
const conRegister = require("../../controllers/signup")

router.post("/register", async function (req, res) {
    try {
        let data = await conRegister.register(req.body);
        return res.status(200).json({
            success: true,
            message: `Ok`,
            data: data
        });
    } catch (error) {
        return res.status(500).json({
            message: `Internal Server Error`,
            error: error
        });

    }
});

module.exports = router;
