require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { databaseConnection } = require("./config/database");
const syncDatabase = require("./syncDatabase");
const userRoutes = require("./Routes/userRoutes");

const app = express();

app.use(express.json());
app.use(cors({
    origin: [""]
}));

const startServer = async () => {
    const isConnected = await databaseConnection();

    if(!isConnected) {
        console.error("Database Connection Failed");
        process.exit(1);
    }

    await syncDatabase();
    
    app.get("/", (req, res) => {
        res.send("GOQii Backend");
    })

    app.use("/user", userRoutes);
    
    app.listen(process.env.PORT, () => {console.log(`Server Ready @ ${process.env.PORT}`)});
}

startServer();