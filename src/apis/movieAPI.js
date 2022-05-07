// Chứa các hàm gọi API liên quan đến movie

import { ThongTinDatVe } from "models/ThongTinDatVe";
import axios from "./axiosClient";

export const getMovieShowing = (tenPhim) => {
  if (tenPhim !== "") {
    return axios.get(
      `QuanLyPhim/LayDanhSachPhim?maNhom=GP13&tenPhim=${tenPhim}`
    );
  }
  return axios.get("QuanLyPhim/LayDanhSachPhim", {
    params: {
      maNhom: "GP13",
    },
  });
};

export const getMovieDetails = (movieId) => {
  return axios.get("QuanLyRap/LayThongTinLichChieuPhim", {
    params: {
      maPhim: movieId,
    },
  });
};

export const getMovieBanners = () => {
  return axios.get("QuanLyPhim/LayDanhSachBanner", {});
};

export const getTheaterInfomation = () => {
  return axios.get("QuanLyRap/LayThongTinLichChieuHeThongRap", {
    params: {
      maNhom: "GP01",
    },
  });
};

export const layThongTinheThongRap = ()=>{
  return axios.get("QuanLyRap/LayThongTinHeThongRap")
}
export const layThongTinCumRap = (maHeThongRap)=>{
  return axios.get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
}

export const taoLichChieu = (thongTinLichChieu)=>{
  return axios.post(`QuanLyDatVe/TaoLichChieu/`, thongTinLichChieu)
}


export const getTicket = (ticketId) => {
  return axios.get("QuanLyDatVe/LayDanhSachPhongVe", {
    params: {
      maLichChieu: ticketId,
    },
  });
};

export const datVePhim = (thongTinDatVe = new ThongTinDatVe()) => {
  return axios.post("QuanLyDatVe/DatVe", {
    ...thongTinDatVe,
  });
};

export const layLichSuDatVe = () => {
  return axios.post("QuanLyNguoiDung/ThongTinTaiKhoan", {});
};

export const addNewMovie = (movie) => {
  //Nếu object movie có chứa data là định dạng file thì ko thể upload như bth, server sẽ nhận rỗng
  //Cần chuyển về định dạng FormData để upload thành công
  const formData = new FormData();
  // formData.append("maNhom", "GP08");
  for (let key in movie) {
    formData.append(key, movie[key]);
  }
  formData.forEach((item) => {
    console.log(item);
  });

  return axios.post("QuanLyPhim/ThemPhimUploadHinh", formData);
};

export const deleteMovie = (maPhim) => {
  return axios.delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
};

export const layThongTinPhim = (maPhim) => {
  return axios.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
};

export const layDanhSachNguoiDung = (tuKhoa) => {
  console.log(tuKhoa)
  if (tuKhoa.trim() !== "") {
    return axios.get(
      `QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${tuKhoa}`
    );
  }
  return axios.get("QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01");
};

export const layThongTinNguoiDung = (taiKhoan) => {
  return axios.post(
    `QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`
  );
};

export const capNhatThongTinUser = (data) => {
  return axios.post("QuanLyNguoiDung/CapNhatThongTinNguoiDung", {
    ...data,
    maNhom: "GP01",
  });
};
