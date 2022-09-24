const Person = require("../models/individualPerson");

module.exports.register = async (data) => {
    const { name, email, password } = data;
    if (name && email && password) {
        let guy = await Person.findOne({ email: email });
        if (guy) {
            return "This guy already exists"
        } else {
            await Person.create({
                email: email,
                name: name,
                password: password,
            });
            return "User Created"
        }
    } else {
        return "Please enter required fields"
    }

}
