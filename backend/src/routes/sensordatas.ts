import express from "express";
import * as SensorDatasController from "../controllers/sensordatas"

const router = express.Router();                                                            // creating a new router 

router.get("/", SensorDatasController.getSensorDatas);                                      // we use the getSensorDatas we created for all Data

router.get("/:sensordataID", SensorDatasController.getSensorData);                           //with the : express will treat this as a variable, we use the getSensorData we created for dynamic ID

router.post("/", SensorDatasController.createSensorData );                                    // this refers to the functions we have in the controller folder

router.patch("/:sensordataID", SensorDatasController.updateSensorData);

router.delete("/:sensordataID", SensorDatasController.deleteSensorData);

export default router;                                       