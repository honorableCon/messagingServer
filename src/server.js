const jwt = require("jsonwebtoken");
const axios = require("axios");
const messageRoute = require("./routes/message");
const { app, server } = require("./config/app");

const io = require("socket.io")(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    extraHeaders: ["jwttoken"],
  },
});

const port = process.env.SERVER_PORT;

app.use("/message", messageRoute);

io.on("connection", (socket) => {
  // verify user
  const token = socket.handshake.headers.jwttoken;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_RSA_PUBLIC_KEY);
      socket.user = decoded;
    } catch (err) {
      console.log(err.message);
    }
  } else {
    return "No token";
  }

  socket.on("message", (message) => {
    axios
      .post(
        "http://localhost:5000/message",
        {
          message,
        },
        {
          headers: {
            jwttoken: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch(() => {});
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
