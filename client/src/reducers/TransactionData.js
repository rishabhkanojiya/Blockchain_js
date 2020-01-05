const initialState = {
  payload: [],
  isLoading: false,
  error: {}
};

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case "FETCH_TRANSACTION":
      return { ...state, isLoading: true };

    case "FETCH_TRANSACTION_SUCCESS":
      return { ...state, payload, isLoading: false };

    case "FETCH_TRANSACTION_FAILURE":
      return { ...state, error: error, isLoading: false };

    default:
      return state;
  }
};
