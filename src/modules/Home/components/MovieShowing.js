import Film from "components/Film/Film";
import MultipleRowSlickMovie from "components/MovieList/MutipleRowSlickMovie";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getShowing } from "../slices/movie";

function MovieShowing() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.homeMovie);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getShowing());
  }, []);

  const goToMovieDetails = (movieId) => {
    // Navigate tới trang movies/:movieId
    navigate(`/movies/${movieId}`);
  };

  if (isLoading) {
    return <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 border-violet-800 mx-auto animate-spin"></div>;
  }
  if (error) {
    return <p>{error || "Something went wrong"}</p>;
  }

  return (
    <div className="container px-5 pb-10 pt-[64px] mx-auto" id="lichChieu">
      <MultipleRowSlickMovie data={data} />
    </div>
  );
}

export default MovieShowing;
