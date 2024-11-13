const express = require("express");
const path = require("path");
const app = express();
const assetsRouter = require("./server/assets-router");
const config = require('./config/config.js');
const mongoose = require('mongoose');

app.use("/src", assetsRouter);
app.use("/", express.static(path.join(__dirname, "public")));
app.get("/api/v1", (req, res) => {
    res.json({
        project: "Farmer's Market",
        from: "ExpressCrew",
    });
});
app.get("/*", (_req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
})

app.listen(config.port, () => {
    console.log();
    console.log(`App running in port ${config.port}`);
    console.log();
    console.log(`> Local: \x1b[36mhttp://localhost:\x1b[1m${config.port}/\x1b[0m`);
});

mongoose.Promise = global.Promise

mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    //useCreateIndex: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database!"); }
)

mongoose.connection.on('error', () =>{
    throw new Error(`unable to connect to database: ${config.mongoUri}`);
})