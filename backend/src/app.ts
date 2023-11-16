import "dotenv/config";                                                 //for .env folder
import express, { NextFunction, Request, Response } from "express";                                          //import express
import sensordataModel from "./models/sensordata"

const app = express();                                                  //dont know what this does yet / calls the express function i guess

app.get("/", async (req, res, next) => {                                      //changed this to asnyc so we can use await in the function.
    try {                                                               //Error Handling!
        // throw Error("Bazinga!");                                     //Trial Error
    const sensordatas = await sensordataModel.find().exec();            //With this we get the data from the database
    res.status(200).json(sensordatas);                                  // this catches the response from the await above as ok and then gives out the sensordata as json    
    } catch (error) {                                                   //Error Handling Part 2
       next(error);
    }                                    
        
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {          //moves error handling from a try catch stateent into a the error handler of express
    console.error(error);                                           //prints the error into the console
    let errorMessage= "An Unknown error occurred";                  //create variable errorMessage with a default String, this can be cahnged by the error itself
    if (error instanceof Error) errorMessage = error.message;       //We have to verify if the error is actually and error, because the catch function catches everythign unknown
    res.status(500).json({ error: errorMessage});                   //give out a error response and includes the error Message as Json
});

export default app;                                                     //expor the app const so we can import it in the server.ts