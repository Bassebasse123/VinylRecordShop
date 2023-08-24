import Record from "../models/recordModel.js";
import { isValidId } from "../middlewares/errorHandlers.js";
import successHandler from "../middlewares/successHandler.js";
import ApiQueryHandler from "../utilities/apiQueryHandler.js";

export const getAllRecords = async (req, res, next) => {
  try {
    let apiQuery = new ApiQueryHandler(Record, req.query)
      .filterDocs()
      .sortDocs()
      .limitFields()
      .paginateDocs();

    const records = await apiQuery.model;

    successHandler(res, 200, records, records.length);
  } catch (error) {
    next(error);
  }
};

export const getRecordById = async (req, res, next) => {
  try {
    isValidId(req);
    const record = await Record.findById(req.params.id);
    successHandler(res, 200, record);
  } catch (error) {
    next(error);
  }
};

export const addRecord = async (req, res, next) => {
  try {
    const record = new Record(req.body);
    record.save();
    successHandler(res, 200, record);
  } catch (error) {
    next(error);
  }
};

export const deleteRecordById = async (req, res, next) => {
  try {
    isValidId(req);
    const record = await Record.findByIdAndDelete(req.params.id);
    successHandler(res, 200, record);
  } catch (error) {
    next(error);
  }
};

export const deleteAllRecords = async (req, res, next) => {
  try {
    const deleteConfirm = await Record.deleteMany();
    successHandler(res, 200, deleteConfirm);
  } catch (error) {
    next(error);
  }
};

export const updateRecordById = async (req, res, next) => {
  try {
    isValidId(req);
    const record = await Record.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    successHandler(res, 200, record);
  } catch (error) {
    next(error);
  }
};
