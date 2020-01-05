import Axios from "axios";

export const fetchInput = payload => async dispatch => {
  dispatch({ type: "FETCH_INPUT", payload });
};

export const fetchData = term => async dispatch => {
  dispatch({ type: "FETCH_BLOCK" });

  try {
    const response = await Axios.get(`/api/block/${term}`, {});
    dispatch({
      type: "FETCH_BLOCK_SUCCESS",
      payload: response.data
    });
  } catch (error) {
    dispatch({ type: "FETCH_BLOCK_FAILURE", error });
  }
};

export const fetchTransaction = term => async dispatch => {
  dispatch({ type: "FETCH_TRANSACTION" });

  try {
    const response = await Axios.get(`/api/transaction/${term}`, {});
    dispatch({
      type: "FETCH_TRANSACTION_SUCCESS",
      payload: response.data
    });
  } catch (error) {
    dispatch({ type: "FETCH_TRANSACTION_FAILURE", error });
  }
};

export const fetchAddress = term => async dispatch => {
  dispatch({ type: "FETCH_ADDRESS" });

  try {
    const response = await Axios.get(`/api/address/${term}`, {});
    dispatch({
      type: "FETCH_ADDRESS_SUCCESS",
      payload: response.data.addressData.addressTransactions
    });
  } catch (error) {
    dispatch({ type: "FETCH_ADDRESS_FAILURE", error });
  }
};
