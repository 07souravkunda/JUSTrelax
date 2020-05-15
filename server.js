const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const CONNECTION_STRING =
  "mongodb+srv://sourav:<PASSWORD>@cluster0-syyka.gcp.mongodb.net/test?retryWrites=true&w=majority";
const PASSWORD = "9PhB6L5hys96VoDc";
const url = CONNECTION_STRING.replace("<PASSWORD>", PASSWORD);
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("database connected");
  })
  .catch((er) => {
    console.log(er);
  });

const hostname = "localhost";
const port = process.env.PORT || 3000;

app.listen(port, hostname, () => {
  console.log(port);
  console.log("server running...");
});
