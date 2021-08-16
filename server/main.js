const express = require("express");
const cors = require("cors");
const userRouter = require("./routers/UserRouter");
const ShowRouter = require("./routers/ShowRouter");
const SubscriptionRouter = require("./routers/SubscriptionRouter");
const MemberRouter = require("./routers/MemberRouter");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRouter);
app.use("/api/shows", ShowRouter);
app.use("/api/subscriptions", SubscriptionRouter);
app.use("/api/members", MemberRouter);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status = error.status || 500;
  res.json({
    error: {
      message: error.message,
    },
  });
});

require("./config/database");

app.listen(8000);
