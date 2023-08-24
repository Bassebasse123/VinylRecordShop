import axios from "axios";

const getAllRecords = async (dispatchRecords) => {
  try {
    const response = await axios.get("/records");
    await dispatchRecords({
      type: "FETCH_RECORDS_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export default getAllRecords;
