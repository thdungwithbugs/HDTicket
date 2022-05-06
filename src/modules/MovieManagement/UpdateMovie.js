import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { addMovie } from "./slices/AddMovieSlice";
import moment from "moment";
import { Form, Switch } from "antd";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "./slices/GetMovieDetail";

function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [day, mnth, date.getFullYear()].join("/");
}

const schema = yup.object({
  tenPhim: yup.string().required("Tên phim không được để trống"),
  biDanh: yup.string().required("Bí danh không được để trống"),
  moTa: yup.string().required("Mô tả phim không được để trống"),
  ngayKhoiChieu: yup
    .date()
    .typeError("Phải đúng định dạng")
    .required("Ngày khởi chiếu không được để trống"),
  sapChieu: yup.boolean().typeError("True / false").required(),
  dangChieu: yup.boolean().typeError("True / false").required(),
  hot: yup.boolean().typeError("True / false").required(),
  danhGia: yup
    .number()
    .typeError("Hãy nhập số điểm đánh giá theo thang 10")
    .required("Hãy nhập số điểm đánh giá phim"),
  trailer: yup.string().required("Link trailer không được để trống"),
  //   hinhAnh: yup.required("Upload hình nền phim"),
});

const UpdateMovie = () => {
  let { id } = useParams();

  useEffect(() => {
    dispatch(getMovieDetail(id))
  }, []);

  const { data, isLoading, error } = useSelector((state) => state.getDetail);
  console.log(data);
  const [imgPreview, setImgPreview] = useState(data?.hinhAnh || null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      tenPhim: data?.tenPhim,
      biDanh: data?.biDanh,
      moTa: data?.moTa,
      ngayKhoiChieu: data?.ngayKhoiChieu,
      sapChieu: "",
      dangChieu: "",
      hot: data?.hot,
      danhGia: data?.danhGia,
      trailer: data?.trailer,
      hinhAnh: '',
    },
    mode: "onTouched", // Cơ chế kích hoạt validation,
    resolver: yupResolver(schema), // Sử dụng schema để validate
  });

  useEffect(() => {
    // Khi nhận đc data từ API, set lại value cho form
    if (!Object.keys(data).length) return;

    setValue("tenPhim", data.tenPhim);
    setValue("biDanh", data.biDanh);
    setValue("moTa", data.moTa);
    setValue("ngayKhoiChieu", moment(data.ngayKhoiChieu).format("YYYY-MM-DD"));
    setValue("hot", data.hot);
    setValue("sapChieu", data.sapChieu);
    setValue("dangChieu", data.dangChieu);
    setValue("danhGia", data.danhGia);
    setValue("trailer", data.trailer);
  }, [data]);

  const watchImage = watch("hinhAnh", false);
  useEffect(() => {
    const file = getValues("hinhAnh")[0];
    if (!file) return;
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (evt) => {
        setImgPreview(evt.target.result);
      };
      setValue("hinhAnh", file);
    }
  }, []);

  const dispatch = useDispatch();

  const onSubmit = (values) => {
    // console.log(values);
    // ngayKhoiChieu: convert(values.ngayKhoiChieu)
    // moment(values).format("DD/MM/YYYY")
    const payload = {
      ...values,
      hinhAnh: values.hinhAnh[0],
      ngayKhoiChieu: convert(values.ngayKhoiChieu),
      maNhom: "GP13",
    };
    console.log(payload);
    dispatch(addMovie(payload));
  };

  const onError = (errors) => {
    console.log(errors);
  };

  if (isLoading) {
    return <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 border-violet-800 mx-auto animate-spin"></div>;
  }
  if (error) {
    return <p>{error || "Something went wrong"}</p>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Cập nhật phim</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="w-auto">
        <table>
          <tr>
            <td>
              {" "}
              <label
                htmlFor="tenPhim"
                className="text-lg font-semibold text-purple-600 mr-3"
              >
                Tên phim
              </label>
            </td>
            <td>
              {" "}
              <input
                className="p-2 border border-slate-400 rounded-md max-w-[400px]"
                type="text"
                id="tenPhim"
                {...register("tenPhim")}
              />
              {errors.tenPhim && (
                <span className="text-red-600">{errors.tenPhim.message}</span>
              )}
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <label
                htmlFor="biDanh"
                className="text-lg font-semibold text-purple-600 mr-3"
              >
                Bí danh phim
              </label>
            </td>
            <td>
              {" "}
              <input
                type="text"
                className="max-w-[400px] p-2 border border-slate-400 rounded-md"
                id="biDanh"
                {...register("biDanh")}
              />
              {errors.biDanh && (
                <span className="text-red-600">{errors.biDanh.message}</span>
              )}
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <label
                htmlFor="moTa"
                className="text-lg font-semibold text-purple-600 mr-3"
              >
                Mô tả phim
              </label>
            </td>
            <td>
              {" "}
              <textarea
                className="max-w-[400px] p-2 border border-slate-400 rounded-md"
                id="moTa"
                {...register("moTa")}
              />
              {errors.moTa && (
                <span className="text-red-600">{errors.moTa.message}</span>
              )}
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <label
                htmlFor="ngayKhoiChieu"
                className="text-lg font-semibold text-purple-600 mr-3"
              >
                Ngày khởi chiếu
              </label>
            </td>
            <td>
              {" "}
              <input
                type="date"
                className="max-w-[400px] p-2 border border-slate-400 rounded-md"
                id="ngayKhoiChieu"
                {...register("ngayKhoiChieu")}
              />
              {errors.ngayKhoiChieu && (
                <span className="text-red-600">
                  {errors.ngayKhoiChieu.message}
                </span>
              )}
            </td>
          </tr>

          <tr>
            <td>
              <Controller
                name="sapChieu"
                control={control}
                render={({ field, fieldState }) => (
                  <Form.Item label="Sắp chiếu" valuePropName="checked">
                    <Switch
                      name="sapChieu"
                      checked={field.value}
                      {...field}
                      error={fieldState.error?.message}
                    />{" "}
                  </Form.Item>
                )}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Controller
                name="dangChieu"
                control={control}
                render={({ field, fieldState }) => (
                  <Form.Item label="Đang chiếu" valuePropName="checked">
                    <Switch
                      name="dangChieu"
                      checked={field.value}
                      {...field}
                      error={fieldState.error?.message}
                    />{" "}
                  </Form.Item>
                )}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Controller
                name="hot"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Form.Item label="Phim hot">
                      <Switch
                        name="hot"
                        checked={field.value}
                        {...field}
                        error={fieldState.error?.message}
                      />
                    </Form.Item>
                  );
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <label
                htmlFor="danhGia"
                className="text-lg font-semibold text-purple-600 mr-3"
              >
                Điểm đánh giá (thang 10)
              </label>
            </td>
            <td>
              {" "}
              <input
                type="text"
                className="max-w-[400px] p-2 border border-slate-400 rounded-md"
                id="danhGia"
                {...register("danhGia")}
              />
              {errors.danhGia && (
                <span className="text-red-600">{errors.danhGia.message}</span>
              )}
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <label
                htmlFor="trailer"
                className="text-lg font-semibold text-purple-600 mr-3"
              >
                Link trailer youtube (embed)
              </label>
            </td>
            <td>
              {" "}
              <input
                type="text"
                className="max-w-[400px] p-2 border border-slate-400 rounded-md"
                id="trailer"
                {...register("trailer")}
              />
              {errors.trailer && (
                <span className="text-red-600">{errors.trailer.message}</span>
              )}
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <label
                htmlFor="hinhAnh"
                className="text-lg font-semibold text-purple-600 mr-3"
              >
                Hình ảnh
              </label>
            </td>
            <td>
              {" "}
              <input
                type="file"
                accept="image/png, image/jpeg, image/gif"
                className="max-w-[400px] p-2 border border-slate-400 rounded-md"
                id="hinhAnh"
                {...register("hinhAnh")}
              />
              {errors.hinhAnh && (
                <span className="text-red-600">{errors.hinhAnh.message}</span>
              )}
              {(imgPreview || data.hinhAnh) && (
                <img
                  src={data.hinhAnh}
                  alt="preview_uploadImage"
                  className="h-[30vh] object-cover my-3 rounded-md"
                />
              )}
            </td>
          </tr>
        </table>
        <button className="max-w-[200px] px-3 py-2 bg-purple-300 font-semibold rounded-sm text-purple-900 hover:bg-purple-400">
          Cập nhật phim
        </button>
      </form>
    </>
  );
};

export default UpdateMovie;
