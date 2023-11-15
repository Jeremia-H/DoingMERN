import "dotenv/config";                                                 //for .env folder
import express from "express";                                          //import express
import sensordataModel from "./models/node"

const app = express();                                                  //dont know what this does yet / calls the express function i guess

app.get("/", (req, res) => {                                            
    res.send("Hello, World!");                                          //This is what you see when you open the website, aka. get request
});

export default app;                                                     //expor the app const so we can import it in the server.ts