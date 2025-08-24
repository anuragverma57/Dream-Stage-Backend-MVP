const express = require("express");
const dotenv = require("dotenv");
const authRouter = require("./routers/authRoutes");

const connectDB = require('./config/config')

dotenv.config();
const app = express();

app.use(express.json());

// Routes
app.use("/api/auth", authRouter);

const port = process.env.PORT || 5000;

connectDB().then(() => {
    console.log("DataBase is Connected Successfully")
    app.listen(port, () => {
        console.log(`Dream Stage Backend is listening on PORT ${port}`)
    })
}).catch((error) => {
    console.error("Not Connected : ", error.message)
})
