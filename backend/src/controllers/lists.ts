import { RequestHandler } from "express";                                                                                         //It doesnt matter what we call the import, it just imports what we sepcified in the sensordata.ts as export
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/assertIsDefined"; //
import listModel from "../models/list";

export const getLists: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);
        const lists = await listModel.find({ userId: authenticatedUserId }).exec();
        res.json(lists);
    } catch (error) {
        next(error);
    }
};

export const getList: RequestHandler = async (req, res, next) => {
    const listID = req.params.listID;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);
        if (!mongoose.isValidObjectId(listID)) {
            throw createHttpError(400, "Invalid list ID");
        }

        const list = await listModel.findById(listID).exec();
        if (!list) {
            throw createHttpError(404, "List not found");
        }

        if (!list.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this list");
        }

        res.json(list);
    } catch (error) {
        next(error);
    }
};

interface CreateListBody {
    titel?: string;
    text?: string;
}

export const createList: RequestHandler<unknown, unknown, CreateListBody, unknown> = async (
    req,
    res,
    next
) => {
    const titel = req.body.titel;
    const text = req.body.text;
    const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);
        if (!titel) {
            console.log(req.body);
            throw createHttpError(400, "List must have a titel create");
        }

        const newList = await listModel.create({
            userId: authenticatedUserId,
            titel: titel,
            text: text,
        });

        res.status(201).json(newList);
    } catch (error) {
        next(error);
    }
};

interface UpdateListParams {
    listID: string;
}

interface UpdateListBody {
    titel?: string;
    text?: string;
}

export const updateList: RequestHandler<UpdateListParams, unknown, UpdateListBody, unknown> = async (
    req,
    res,
    next
) => {
    const listID = req.params.listID;
    const newtitel = req.body.titel;
    const newText = req.body.text;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(listID)) {
            throw createHttpError(400, "Invalid list ID");
        }
        if (!newtitel) {
            throw createHttpError(400, "List must have a titel");
        }
        const list = await listModel.findById(listID).exec();
        if (!list) {
            throw createHttpError(404, "List not found");
        }

        if (!list.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this list");
        }

        list.titel = newtitel;
        list.text = newText;

        const updatedList = await list.save();

        res.status(200).json(updatedList);
    } catch (error) {
        next(error);
    }
};

export const deleteList: RequestHandler = async (req, res, next) => {
    const listID = req.params.listID;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);
        if (!mongoose.isValidObjectId(listID)) {
            throw createHttpError(400, "Invalid list ID");
        }

        const list = await listModel.findById(listID).exec();
        if (!list) {
            throw createHttpError(404, "List not found");
        }

        if (!list.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this list");
        }

        await list.deleteOne();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};