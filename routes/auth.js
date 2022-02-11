const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");

// Register
router.post("/register", async (req, res) => {
    //Let's validate user before saving it
    const { error } = registerValidation(req.body);
    //if a error happens then we dont create a new user
    if (error) return res.status(400).send(error.details[0].message);

    //check if the user is already in the database(same email)
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists!");
    //hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

//Login
router.post("/login", async (req, res) => {
    //login validations
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email or password is wrong!");

    //check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Email or password is wrong!");

    //create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN);
    res.header("auth-token", token).send(token);
    // res.send("Successfully logged in!");
});
module.exports = router;
