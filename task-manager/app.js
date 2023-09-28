require("dotenv").config();
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const PORT = process.env.PORT || 8181;
const nofFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const connectDB = require("./db/connect");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/tasks", tasks);

app.use(nofFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server started listening on port ${PORT}`));
  } catch (err) {}
};

start();
