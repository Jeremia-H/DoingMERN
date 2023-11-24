import { InferSchemaType, Schema, model } from "mongoose";                                  //imports the mongoose functions we need 

const sensordataSchema = new Schema({                                               //create new schema 
    userId: {type: Schema.Types.ObjectId, required: true},
    sensorname: { type: String, required: true  },                  
    grad: { type: String},
}, {timestamps: true });                                                            //timestamps outside because mongoose will do this field automatically with this

type SensorData = InferSchemaType<typeof sensordataSchema>;                         //Create a type SensorData and say to use the sensordataSchema for it. 

export default model<SensorData>("SensorData", sensordataSchema)                    //just like in app.ts we export this now so we can use it somewhere else