import { RequestHandler } from "express";
import sensordataModel from "../models/sensordata";                             //It doesnt matter what we call the import, it just imports what we sepcified in the sensordata.ts as export

export const getSensorDatas: RequestHandler = async (req, res, next) => {                                      //changed this to asnyc so we can use await in the function.
    try {                                                               //Error Handling!
        // throw Error("Bazinga!");                                     //Trial Error
        const sensordatas = await sensordataModel.find().exec();            //With this we get the data from the database
        res.status(200).json(sensordatas);                                  // this catches the response from the await above as ok and then gives out the sensordata as json    
    } catch (error) {                                                   //Error Handling Part 2
        next(error);                                                    // give the error over to the next route.
    }
};