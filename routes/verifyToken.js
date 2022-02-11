const jwt = require("jsonwebtoken");

function verify(req, res, next) {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access denied");
    try {
        const verified = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = verified;
    } catch (error) {
        req.status(400).send("Invalid Token");
    }
}
