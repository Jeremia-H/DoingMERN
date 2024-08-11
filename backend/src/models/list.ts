import { InferSchemaType, Schema, model } from "mongoose";                                  //imports the mongoose functions we need 

const listSchema = new Schema({                                               //create new schema 
    userId: {type: Schema.Types.ObjectId, required: true},
    titel: { type: String, required: true  },                  
    text: { type: String},
}, {timestamps: true });                                                            //timestamps outside because mongoose will do this field automatically with this

type ListData = InferSchemaType<typeof listSchema>;                         //Create a type SensorData and say to use the sensordataSchema for it. 

export default model<ListData>("SensorData", listSchema)                    //just like in app.ts we export this now so we can use it somewhere else