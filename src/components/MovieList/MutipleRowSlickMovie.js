import Film from "components/Film/Film";
import {
  getPhimDangChieu,
  getPhimSapChieu,
  phimDangChieu,
  phimSapChieu,
} from "modules/Home/slices/movie";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import styleSlick from "./MultipelRowSickMovie.module.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    />
  );
}

const MultipleRowSlickMovie = (props) => {
  const dispatch = useDispatch();
  const renderSlickMovies = () => {
    console.log(props);
    return props.data.map((item, index) => {
      return (
        <div key={index} className={`${styleSlick["width-item"]} `}>
          <Film data={item}></Film>
        </div>
      );
    });
  };

  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    rows: 1,
    slidesPerRow: 2,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div>
      <button
        className="px-8 py-3 font-bold rounded bg-purple-300 text-purple-800 mr-2 hover:bg-purple-400"
        onClick={() => {
          dispatch(getPhimDangChieu());
        }}
      >
        PHIM ĐANG CHIẾU
      </button>
      <button
        className="px-8 py-3 font-bold rounded bg-red-200 text-red-500 hover:bg-red-300"
        onClick={() => {
          dispatch(getPhimSapChieu());
        }}
      >
        PHIM SẮP CHIẾU
      </button>
      <Slider {...settings} className="mt-8">
        {renderSlickMovies()}
      </Slider>
    </div>
  );
};

export default MultipleRowSlickMovie;
