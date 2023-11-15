import "dotenv/config";                                                 //for .env folder
import mongoose from "mongoose";                                        //import mongoose for mongoDB
import express from "express";                                          //import express
const app = express();                                                  //dont know what this does yet

app.get("/", (req, res) => {                                            
    res.send("Hello, World!");                                          //This is waht you see when you open the website, aka. get request
});

const port = process.env.PORT;                                          // port from .env folder as port variable so we dont have to write process.env.PORT everytime we want ot use it
mongoose.connect(process.env.MONGO_CONNNECTION_STRING!)                 //MongoDB connection string, we use the ! because it technically this variable could also not be a string, and mongoose does not like this
    .then(() => {                                                       //Use this because mongoose.connect takes some time and this starts after connect is done
        console.log("Mongoose connected");                              //obvious log entry
        app.listen(port, () => {                                        //this was previously outside of these brackets but now its in because it makes no sense to do this when the database is not connected
            console.log("Server running on port: " + port);             //obvious log entry
        });
    })
    .catch(console.error);                                              //this will be called if there is an error and will then dispaly the error itself in the console

