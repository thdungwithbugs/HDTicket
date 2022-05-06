import * as actionTypes from "../constants/movie";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const movieReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.GET_MOVIES_SHOWING_REQUEST:
      return { ...state, isLoading: true, error: null };
    case actionTypes.GET_MOVIES_SHOWING_SUCCESS:
      return { ...state, isLoading: false, data: payload.data };
    case actionTypes.GET_MOVIES_SHOWING_FAILURE:
      return { ...state, isLoading: false, data: payload.error };
    default:
      return state;
  }
};

export default movieReducer;
