const router = require("express").Router();
const User = require("../model/User");
const Joi = require("joi");

const schema = {
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
};

router.post("/register", async (req, res) => {
    //Let's validate user before saving it
    Joi.valid
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    try {
        const savedUser = await user.save();
        console.log(savedUser);
        res.send(savedUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
