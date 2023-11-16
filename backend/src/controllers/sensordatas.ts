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

export const getSensorData: RequestHandler =async (req, res, next) => {                     //This function will handle specific datapoints by using the ID mongoDB gives every entry
    const sensordataID = req.params.sensordataID;                                           //This uses the ID we specify in the routes file after the : router.get("/:sensordataID"
    
    try {
        const sensordata = await sensordataModel.findById(sensordataID).exec();             //THis is similar to getting all data but now we can use the express function to just get a singular datapoint by its ID, which we use the const for
        res.status(200).json(sensordata);
    } catch (error) {
        next(error);
        
    }
}

export const createSensorData: RequestHandler = async (req, res, next) => {         //This Handler will be able to create new Data in our db
    const sensorname = req.body.sensorname;                                         //telling it to use the sensorname we send to it via http.post
    const grad = req.body.grad;                                                     //telling it to use the grad we send to it via http.post

    try {
        const newSensordata = await sensordataModel.create({                        //In here we now say we want to create a new entry in the db with the consts we created above
            sensorname: sensorname,
            grad: grad
        });

        res.status(201).json(newSensordata)                                            // saying new resource has been created
    } catch (error) {
        next(error);
        
    }
};