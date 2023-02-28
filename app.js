require("dotenv").config();
const { PORT } = process.env;

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const routes = require("./routes");
const cors = require("cors");
const errorMiddleware = require("./middlewares/errorMiddleware");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

app.use("/", [routes]);
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Hello Front!!!");
});

app.listen(PORT, () => {
  console.log(`서버가 실행되었습니다.  ${PORT}`);
});
