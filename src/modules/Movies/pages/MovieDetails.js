import React, { useEffect, useState } from "react";
import { Button, Modal, Tabs } from "antd";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMovieDetails } from "../slices/movieDetails";
import Header from "modules/Home/layout/Header/Header";
import Footer from "modules/Home/layout/Footer/Footer";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import moment from "moment";

const { TabPane } = Tabs;

function MovieDetails() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.movieDetails);
  console.log(data);
  const { movieId } = useParams();

  useEffect(() => {
    dispatch(getMovieDetails(movieId));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  // console.log(data);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Header></Header>
      <div className="pt-[64px]">
        <div
          style={{
            backgroundImage: `url(${data.hinhAnh})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundClip: "border-box",
            backgroundSize: "cover",
          }}
        >
          <CustomCard
            style={{ minHeight: "100vh", borderRadius: 0, paddingTop: "25vh" }}
            effectColor="#000" // required
            color="#fff" // default color is white
            blur={20} // default blur value is 10px
            // default border radius value is 10px
          >
            <div className="inline-grid grid-cols-12 items-center justify-center">
              <div className="col-span-4 col-start-3">
                <div className="inline-grid grid-cols-2 items-center justify-center">
                  <img src={data.hinhAnh} alt="thumnail" />
                  <div className="pl-5">
                    <p className="text-sm">
                      Khởi chiếu :{" "}
                      {moment(data.ngayKhoiChieu).format("DD/MM/YYYY")}
                    </p>
                    <p className="text-lg font-bold ">
                      Tên Phim : {data.tenPhim}
                    </p>
                    <p className="text-purple-500 font-semibold bg-white inline-block px-2 py-1 rounded-lg">
                      Mô tả
                    </p>
                    <p className="line-clamp-6">{data.moTa}</p>
                    <Button
                      onClick={showModal}
                      className="text-center inline-block bg-red-200 text-red-500 rounded-lg font-bold text-lg py-2 px-4 ml-2 hover:bg-red-300"
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: "700",
                        color: "#e76f51",
                        border: "none",
                        marginLeft: "0",
                        paddingBottom: "30px",
                      }}
                    >
                      Trailer
                    </Button>
                    <Modal
                      title="Trailer phim - Có thể lỗi do URL API (not embed)"
                      visible={isModalVisible}
                      onCancel={handleCancel}
                      mask="false"
                      width="70vw"
                      footer=""
                      centered="true"
                      destroyOnClose="true"
                      bodyStyle={{
                        height: "80vh",
                      }}
                    >
                      {/* <iframe width="460" height="230" src={data.trailer} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" tabindex="-1"></iframe> */}
                      <iframe
                        // width="636"
                        // height="358"
                        src={data.trailer}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full object-fill rounded-lg"
                      ></iframe>
                    </Modal>
                  </div>
                </div>
              </div>
              <div className="col-span-2 col-start-9">
                <CircularProgressbar
                  value={data.danhGia}
                  maxValue={10}
                  text={`${data.danhGia}/10`}
                  styles={buildStyles({
                    textColor: "#fff",
                    pathColor: "rgb(168 85 247)",
                    // pathColor:'rgb(233 213 255)'
                  })}
                />
                <p className="pt-4">* Điểm theo đánh giá của khán giả.</p>
              </div>
            </div>

            <div className="mt-14 max-w-[1280px] mx-auto bg-white bg-opacity-40 p-5 rounded-lg">
              <Tabs defaultActiveKey="1" centered>
                <TabPane className="min-h-[300px]" tab="Lịch chiếu" key="1">
                  <div>
                    <Tabs
                      tabPosition={"left"}
                      className="bg-white p-5 rounded-lg"
                    >
                      {data.heThongRapChieu?.map((rap, index) => {
                        return (
                          <TabPane
                            tab={
                              <div className="text-back flex items-center gap-2">
                                {" "}
                                <img
                                  className="w-[50px] h-[50px] rounded-full object-cover"
                                  src={rap.logo}
                                  alt={rap.tenHeThongRap}
                                />{" "}
                                {rap.tenHeThongRap}
                              </div>
                            }
                            key={index}
                          >
                            {rap.cumRapChieu?.map((cumRap, index) => {
                              return (
                                <div key={index} className="mt-1">
                                  <div className="flex gap-2 items-center">
                                    <img
                                      src={rap.logo}
                                      alt={rap.tenHeThongRap}
                                      className="w-[50px] h-[50px] rounded-full object-cover"
                                    />
                                    <div className="pt-2">
                                      <div className="text-xl text-red-600 font-semibold">
                                        {cumRap.tenCumRap}
                                      </div>
                                      <p>{cumRap.diaChi}</p>
                                    </div>
                                  </div>
                                  <div className="show_calendar grid grid-cols-5 mb-3">
                                    {cumRap.lichChieuPhim?.map(
                                      (calendar, index) => {
                                        return (
                                          <NavLink
                                            key={index}
                                            className="col-span-1 font-bold text-purple-500"
                                            to={`/booking/${calendar.maLichChieu}`}
                                          >
                                            {moment(
                                              calendar.ngayChieuGioChieu
                                            ).format("hh:mm A")}
                                          </NavLink>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </TabPane>
                        );
                      })}
                    </Tabs>
                  </div>
                </TabPane>
                <TabPane tab="Thông tin" key="2">
                  Thông tin phim (Backend đang cập nhật...)
                </TabPane>
                <TabPane tab="Đánh giá" key="3">
                  Đánh giá phim (Backend đang cập nhật...)
                </TabPane>
              </Tabs>
            </div>
          </CustomCard>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default MovieDetails;
