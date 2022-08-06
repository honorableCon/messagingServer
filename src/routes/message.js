const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
  const { message } = req.body;
  const token = req.headers.jwttoken;
  try {
    const decoded = jwt.verify(token, process.env.JWT_RSA_PUBLIC_KEY);
    const { email } = decoded;
    // save to db
    res.send({ to: message.to, message: message.message, from: email });
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/", (req, res) => {
  res.send({ message: "success" });
});

module.exports = router;
