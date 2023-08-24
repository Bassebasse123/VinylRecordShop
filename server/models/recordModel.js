import mongoose from "mongoose";

const { Schema, model } = mongoose;

const recordSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  year: {
    type: Number,
    required: true,
  },

  artist: {
    type: String,
    required: true,
  },

  img: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  genre: {
    type: String,
    required: true,
  },
});

/* 
! Or make it DRY:

const createObj = (type) => {
  return {
    type: type,
    required: true,
  };
};

const recordSchema = new Schema({
  title: createObj(String),
  year: createObj(Number),
  artist: createObj(String),
  img: createObj(String),
  price: createObj(Number),
  genre: createObj(String),
});

*/

export default model("Record", recordSchema);
