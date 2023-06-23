const express = require("express");
const dbconnect = require("./config/dbconnect");
const app = express();
const dotnev = require("dotenv").config();
const authRouter = require("./routes/authRoutes");
const bodyParser = require("body-parser");

const { notFound, errorHandler } = require("./middleware/errorHandler");

const port = process.env.PORT || 4000;

dbconnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
