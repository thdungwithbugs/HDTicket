import { getMovieShowing } from "apis/movieAPI";
import * as actionTypes from "../constants/movie";

export const getMoviesShowing = () => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.GET_MOVIES_SHOWING_REQUEST });
    try {
      const { data } = await getMovieShowing();
      dispatch({
        type: actionTypes.GET_MOVIES_SHOWING_SUCCESS,
        payload: {
          data: data.content,
        },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_MOVIES_SHOWING_FAILURE,
        payload: {
          error: error.response.data,
        },
      });
    }
  };
};
