import express from "express";
import * as ListDatasController from "../controllers/lists"

const router = express.Router();                                                            // creating a new router 

router.get("/", ListDatasController.getLists);                                      // we use the getListDatas we created for all Data

router.get("/:listdataID", ListDatasController.getList);                           //with the : express will treat this as a variable, we use the getListData we created for dynamic ID

router.post("/", ListDatasController.createList );                                    // this refers to the functions we have in the controller folder

router.patch("/:listdataID", ListDatasController.updateList);

router.delete("/:listdataID", ListDatasController.deleteList);

export default router;                                       