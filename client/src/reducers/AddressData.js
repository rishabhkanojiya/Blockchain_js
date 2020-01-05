const initialState = {
  payload: [],
  isLoading: false,
  error: {}
};

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case "FETCH_ADDRESS":
      return { ...state, isLoading: true };

    case "FETCH_ADDRESS_SUCCESS":
      return { ...state, payload, isLoading: false };

    case "FETCH_ADDRESS_FAILURE":
      return { ...state, error: error, isLoading: false };

    default:
      return state;
  }
};
