import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBanner } from "modules/Home/slices/banner";

const HomeCarousel = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.banner);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBanner());
  }, []);

  if (isLoading) {
    return <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 border-violet-800 mx-auto animate-spin"></div>;
  }
  if (error) {
    return <p>{error || "Something went wrong"}</p>;
  }
  return (
    <Carousel autoPlay infiniteLoop transitionTime={1000}>
      {data.map((banner) => (
        <div key={banner.maBanner}>
          <img
            src={banner.hinhAnh}
            alt="movie_banner"
            className="w-full h-[90vh] object-cover contentStyle"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default HomeCarousel;
