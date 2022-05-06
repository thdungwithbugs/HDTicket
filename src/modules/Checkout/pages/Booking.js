import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { datGhe, datGheAction, datVe, datVeXemPhim, getSeat } from "../slices/bookingSlice";
import styled from "./Booking.module.css";
import "./Booking.css";
import { CloseOutlined, CheckOutlined, SmileOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import _ from "lodash";
import { ThongTinDatVe } from "models/ThongTinDatVe";
import { Tabs } from "antd";
import { layLichSuDatVePhim } from "modules/LichSuDatVe/slices/LichSuDatVeSlice";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import Header from "modules/Home/layout/Header/Header";
import { connection } from "index";

const Booking = () => {
  const { user } = useSelector((state) => state.auth);
  // console.log(user)
  const dispatch = useDispatch();
  const { data, isLoading, error, danhSachGheDangDat, danhSachGheKhachDat } =
    useSelector((state) => state.seat);
  const { ticketId } = useParams();
  useEffect(() => {
    dispatch(getSeat(ticketId));

    //Luôn lắng nghe server trả tự động ghế đang được đặt bởi những client khác
    connection.on("loadDanhSachGheDaDat",(dsGheKhachDat)=>{
      // console.log('Danh sách ghế người khác đang đặt',dsGheKhachDat);
      dsGheKhachDat = dsGheKhachDat.filter(otherUser => otherUser.taiKhoan !== user.taiKhoan);
      console.log(dsGheKhachDat);
      //Gộp tất cả các user khác (object) vào 1 mảng
      let arrGheKhachDat = dsGheKhachDat.reduce((result,item,index)=>{
        let arrGhe = JSON.parse(item.danhSachGhe);
        return [...result, ...arrGhe]
      },[]);
      //loại bỏ tình trạng nhiều user đặt cùng 1 vé, dùng hàm lodash loại bỏ phần tử trùng trong mảng ghế khách đặt
      arrGheKhachDat = _.uniqBy(arrGheKhachDat,'maGhe')
      console.log(arrGheKhachDat)
      dispatch(datGhe(arrGheKhachDat))
    })
  }, []);

  let navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 border-violet-800 mx-auto animate-spin"></div>
    );
  }

  if (error) {
    return <p>{error || "Something went wrong"}</p>;
  }

  const { thongTinPhim, danhSachGhe } = data;
  // console.log(data);

  const renderSeats = () => {
    return danhSachGhe?.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";
      let classGheDangDat = "";
      let indexGheDangDat = danhSachGheDangDat.findIndex(
        (gheDangDat) => gheDangDat?.maGhe === ghe?.maGhe
      );
      let classGheKhachDat = "";
      let indexGheKhachDat = danhSachGheKhachDat.findIndex(
        (gheKhachDat) => gheKhachDat.maGhe === ghe.maGhe
      );
      if (indexGheKhachDat !== -1) {
        classGheKhachDat = "gheKhachDat";
      }
      let classGheDuocDat = "";
      if (indexGheDangDat !== -1) {
        classGheDaDat = "gheDangDat";
      }
      if (user.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDuocDat = "gheDuocDat";
      }
      return (
        <Fragment key={index}>
          <button
            disabled={ghe.daDat || classGheKhachDat !== ""}
            className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDuocDat} ${classGheKhachDat} hover:scale-125 transition-all`}
            onClick={() => {
              const action = datGheAction (ghe,thongTinPhim.maLichChieu)
              dispatch(action)             
            }}
          >
            {ghe.daDat ? (
              classGheDuocDat !== "" ? (
                <CheckOutlined style={{ marginBottom: 7 }} />
              ) : (
                <CloseOutlined style={{ marginBottom: 7 }} />
              )
            ) : classGheKhachDat !== "" ? (
              <ShoppingCartOutlined  style={{ marginBottom: 7 }} />
            ) : (
              ghe.stt
            )}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  return (
    <div className="min-h-screen pr-5">
      <div className="grid grid-cols-12 mt-4">
        <div className="col-span-9">
          <div className="flex items-center flex-col mt-5">
            <div className="bg-black w-[80%] h-[15px]"></div>
            <div className={`${styled["trapezoid"]} text-center`}>
              <h2 className="mt-4">Màn hình</h2>
            </div>
            <div>{renderSeats()}</div>
          </div>
        </div>
        <div className="col-span-3">
          <h3 className="text-purple-600 text-center text-3xl font-bold">
            {danhSachGheDangDat
              .reduce((tongTien, ghe) => {
                return (tongTien += ghe.giaVe);
              }, 0)
              .toLocaleString()}{" "}
            VNĐ
          </h3>
          <hr />
          <h3 className="text-xl pt-2">Phim: {thongTinPhim?.tenPhim}</h3>
          <p>Rạp: {thongTinPhim?.tenCumRap}</p>
          <p>Địa chỉ: {thongTinPhim?.diaChi}</p>
          <p>
            Ngày chiếu: {thongTinPhim?.ngayChieu} - {thongTinPhim?.gioChieu} -{" "}
            {thongTinPhim?.tenRap}
          </p>
          <hr />
          <div className="flex items-center justify-between py-2">
            <div className="flex gap-1 items-center">
              <span className="text-red-700 font-semibold bg-red-300 inline-block py-1 px-2">
                GHẾ
              </span>
              {_.sortBy(danhSachGheDangDat, ["stt"]).map(
                (gheDangDat, index) => {
                  return (
                    <span
                      key={index}
                      className="text-purple-600 font-semibold mx-1"
                    >
                      {gheDangDat?.stt}
                    </span>
                  );
                }
              )}
            </div>
            <div className="text-purple-600 font-semibold">
              {danhSachGheDangDat
                .reduce((tongTien, ghe) => {
                  return (tongTien += ghe.giaVe);
                }, 0)
                .toLocaleString()}{" "}
              VNĐ
            </div>
          </div>
          <hr />
          <div className="">
            <p className="font-semibold pt-2 m-0">Họ tên:</p>
            <p className="">{user.hoTen}</p>
            <p className="font-semibold pt-2 m-0">Email:</p>
            <p className="">{user.email}</p>
            <p className="font-semibold pt-2 m-0">Số điện thoại:</p>
            <p className="">{user.soDT}</p>
            <button
              className="bg-red-300 px-2 py-1 rounded-lg mb-2 text-red-700 text-md font-semibold hover:bg-red-400 transition-all"
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/");
                window.location.reload();
              }}
            >
              ĐĂNG XUẤT
            </button>
          </div>
          <hr />
          <div className="mb-0 flex flex-col mt-5 items-center">
            <button
              className="bg-purple-300 py-2 rounded-lg font-semibold text-purple-800 w-full text-center text-lg hover:bg-purple-400 cursor-pointer mb-2"
              onClick={() => {
                const thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = thongTinPhim.maLichChieu;
                thongTinDatVe.danhSachVe = danhSachGheDangDat;
                dispatch(datVeXemPhim(thongTinDatVe)).then(()=>{
                  dispatch(getSeat(ticketId));
                });
                // window.location.reload();
              }}
            >
              ĐẶT VÉ
            </button>
          </div>
          <div className="flex justify-center gap-3 mt-5 flex-col">
            <div className="flex gap-x-2">
              <div className="bg-[#bb3e03] h-[30px] w-[30px] rounded-md"></div>
              <div className="mt-1">Ghế đã đặt bởi người khác</div>
            </div>
            <div className="flex gap-x-2">
              <div className="bg-gray-500 h-[30px] w-[30px] rounded-md"></div>
              <div className="mt-1">Ghế trống</div>
            </div>
            <div className="flex gap-x-2">
              <div className="bg-orange-400 h-[30px] w-[30px] rounded-md"></div>
              <div className="mt-1">Ghế VIP</div>
            </div>
            <div className="flex gap-x-2">
              <div className="bg-green-500 h-[30px] w-[30px] rounded-md"></div>
              <div className="mt-1">Ghế đang chọn</div>
            </div>
            <div className="flex gap-x-2">
              <div className="bg-purple-300 h-[30px] w-[30px] rounded-md"></div>
              <div className="mt-1">Ghế đã được đặt bởi bạn</div>
            </div>
            <div className="flex gap-x-2">
              <div className="bg-[#00b4d8] h-[30px] w-[30px] rounded-md"></div>
              <div className="mt-1">
                Ghế đang được chọn bởi người khác (Real-time)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const { TabPane } = Tabs;
function callback(key) {}

export default function (props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  // const {tabActive} = useSelector(state=>state.seat)
  return (
    <div>
      <Header></Header>
      <div className="px-5 py-[70px]">
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1">
            <Booking {...props}></Booking>
          </TabPane>
          <TabPane tab="02 KẾT QUẢ ĐẶT VÉ THÀNH CÔNG" key="2">
            <KetQuaDatVe {...props}></KetQuaDatVe>
          </TabPane>
        </Tabs>
        <ToastContainer />
      </div>
    </div>
  );
}

function KetQuaDatVe(props) {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.history);
  console.log(data);

  useEffect(() => {
    dispatch(layLichSuDatVePhim());
  }, []);
  if (isLoading) {
    return (
      <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 border-violet-800 mx-auto animate-spin"></div>
    );
  }

  if (error) {
    return <p>{error || "Something went wrong"}</p>;
  }
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-sm text-indigo-500 tracking-widest font-medium title-font mb-1">
              Kiểm tra kỹ vé phim trước khi vào rạp
            </h2>
            <h1 className="sm:text-3xl text-3xl font-medium title-font text-gray-900 flex items-center justify-center gap-3">
              Lịch sử đặt vé thành công của bạn <SmileOutlined />
            </h1>
            <h2 className="text-sm text-purple-700 tracking-widest font-medium title-font mb-1 leading-6">
              Vui lòng không spam đặt vé, ảnh hưởng API. <br></br> Cập nhật lại lịch sử để kiểm tra. Xin cảm ơn!
            </h2>
            <button className="p-2 bg-blue-400 rounded-lg hover:bg-blue-500 text-lg font-semibold w-fit mx-auto mt-2 text-white" onClick={()=>{window.location.reload()}}>Cập nhật</button>
          </div>
          {data.thongTinDatVe && data.thongTinDatVe.length > 0 ? (
            <div className="flex flex-wrap -m-4">
              {data?.thongTinDatVe?.map((lichsu, index) => {
                const showChiTietVe = _.first(lichsu.danhSachGhe);
                return (
                  <div
                    className="p-4 md:w-1/3 shadow-lg rounded-lg"
                    key={index}
                  >
                    <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 mr-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                          <img
                            src={lichsu.hinhAnh}
                            alt=""
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </div>
                        <h2 className="text-gray-900 text-lg title-font font-medium">
                          {lichsu.tenPhim}
                        </h2>
                      </div>
                      <div className="flex-grow">
                        <p className="leading-relaxed text-base">
                          Thời gian đặt vé:{" "}
                          {moment(lichsu.ngayDat).format("hh:mm A")} -{" "}
                          {moment(lichsu.ngayDat).format("DD/MM/YYYY")}{" "}
                        </p>
                        <p className="leading-relaxed text-base">
                          Cụm rạp: {showChiTietVe.tenHeThongRap} -{" "}
                          {showChiTietVe.tenCumRap}
                        </p>
                        <p className="leading-relaxed text-base">
                          Thời lượng phim: {lichsu.thoiLuongPhim} phút
                        </p>
                        <p className="leading-relaxed text-base">
                          Giá vé: {lichsu.giaVe} VNĐ
                        </p>
                        <p className="leading-relaxed text-base break-all">
                          Ghế số:{" "}
                          {lichsu.danhSachGhe.map((ghe, index) => {
                            return (
                              <span
                                className="mx-1 mb-1 inline-block bg-green-300 px-2 py-1 border border-solid border-green-500"
                                key={index}
                              >
                                {ghe.tenGhe}
                              </span>
                            );
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <p className="text-purple-700 font-semibold text-lg text-center">
                Tính tới hiện tại, lịch sử ghi nhận bạn chưa đặt vé nào.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
