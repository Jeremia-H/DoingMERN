import express from "express";
import * as SensorDatasController from "../controllers/sensordatas"

const router = express.Router();

router.get("/", SensorDatasController.getSensorDatas);

export default router;