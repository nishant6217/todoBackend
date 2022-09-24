const Person = require("../models/individualPerson");
const jwt = require("jsonwebtoken");


module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    try {
        if (email && password) {
            console.log("inside")
            let guy = await Person.findOne({ email: email });
            if (!guy || guy.password != password) {
                return res
                    .status(422)
                    .json({ success: false, message: "invalid username or password" });
            }
            let returnObject = {
                success: true,
                message: "login successful here is your token keep it safe !!",
                data: {
                    token: jwt.sign(guy.toJSON(), "person", { expiresIn: "12d" }),
                },
            }
            return res.status(200).json(returnObject);
        } else {
            console.log("outside")
            return res
                .status(400)
                .json({ success: false, message: "Please provide required fields" });
        }
    } catch (error) {
        return res.status(500).json({
            message: `Internal Server Error`,
            error: error
        });
    }
}


