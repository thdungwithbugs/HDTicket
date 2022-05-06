import React, { Fragment, useEffect, useState } from "react";
import { Tabs, Radio, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getTheaters } from "modules/Home/slices/theater";
import moment from "moment";

const { TabPane } = Tabs;

const HomeMenu = () => {
  const [state, setState] = useState({
    tabPosition: "left",
  });
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.theater);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getTheaters());
  }, []);

  // console.log(data);
  if (isLoading) {
    return <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-violet-800 border-t-4 mx-auto animate-spin"></div>;
  }

  if (error) {
    return <p>{error || "Something went wrong"}</p>;
  }

  const renderHeThongRap = () => {
    return data?.map((item, index) => {
      let { tabPosition } = state;
      return (
        <TabPane
          tab={
            <img
              src={item.logo}
              className="rounded-full w-[50px] h-[50px] object-cover"
              alt="logo_CGV"
            ></img>
          }
          key={item.tenHeThongRap}
        >
          <Tabs tabPosition={tabPosition}>
            {item.lstCumRap?.map((cumRap, index) => {
              return (
                <TabPane
                  tab={
                    <div className="w-[370px] flex gap-1 ">
                      <img
                        src={item.logo}
                        className="rounded-full w-[50px] h-[50px] object-cover"
                        alt="logo_CGV"
                      ></img>
                      <br></br>
                      <div className="text-left mt-1">
                        <div className="font-bold">{cumRap.tenCumRap}</div>
                        <p>{cumRap.diaChi}</p>
                      </div>
                    </div>
                  }
                  key={cumRap.diaChi}
                >
                  {cumRap.danhSachPhim?.slice(0,15).map((film) => {
                    return (
                      <Fragment key={film.maPhim}>
                        <div className="flex my-6">
                          <div className="flex">
                            <img
                              src={film.hinhAnh}
                              alt={film.tenPhim}
                              className="w-[60px] h-[60px] rounded-full object-cover shadow-sky-700"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
                              }}
                            />
                            <div>
                              <h3 className="ml-3 text-lg text-purple-600">
                                {film.tenPhim}
                              </h3>
                              <div className="grid grid-cols-6 gap-5 ml-3">
                                {film.lstLichChieuTheoPhim
                                  ?.slice(0, 12)
                                  .map((calender, index) => {
                                    return (
                                      <NavLink
                                        to={`/booking/${calender.maLichChieu}`}
                                        key={index}
                                        className="text-red-500 bg-red-200 text-base py-1 px-2 rounded-lg"
                                      >
                                        {moment(
                                          calender.ngayChieuGioChieu
                                        ).format("hh:mm A")}
                                      </NavLink>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </Fragment>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };

  let { tabPosition } = state;
  return (
    <div id="cumRap">
    <h1 className="max-w-[1280px] my-7 mx-auto text-2xl text-red-600 font-bold ">Hệ thống rạp phim</h1>
      <Tabs tabPosition={tabPosition} className="container mt-5">
        {renderHeThongRap()}
      </Tabs>
    </div>
  );
};

export default HomeMenu;
