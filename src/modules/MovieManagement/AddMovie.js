import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { addMovie } from "./slices/AddMovieSlice";
import moment from "moment";
import { Form, Switch } from "antd";

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

const AddMovie = () => {
  const [imgPreview, setImgPreview] = useState("");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    reset,
    // setValue
  } = useForm({
    defaultValues: {
      tenPhim: "",
      biDanh: "",
      moTa: "",
      ngayKhoiChieu: "",
      sapChieu: false,
      dangChieu: false,
      hot: false,
      danhGia: 0,
      trailer: "",
      hinhAnh: {},
    },
    mode: "onTouched", // Cơ chế kích hoạt validation,
    resolver: yupResolver(schema), // Sử dụng schema để validate
  });

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
      // setValue("hinhAnh",file)
    }
  }, [getValues, watchImage]);

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
    // console.log(payload);
    dispatch(addMovie(payload)).then(()=>{
      reset();
    });
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Thêm phim mới</h1>

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
                    <Switch {...field} error={fieldState.error?.message} />{" "}
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
                    <Switch {...field} error={fieldState.error?.message} />{" "}
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
                render={({ field, fieldState }) => (
                  <Form.Item label="Phim hot" valuePropName="checked">
                    <Switch {...field} error={fieldState.error?.message} />{" "}
                  </Form.Item>
                )}
              />
            </td>
          </tr>

          {/* <tr>
      <td>
        {" "}
        <label
          htmlFor="sapChieu"
          className="text-lg font-semibold text-purple-600 mr-3"
        >
          Sắp chiếu (true/false)
        </label>
      </td>
      <td>
        {" "}
        <input
          type="text"
          className="max-w-[400px] p-2 border border-slate-400 rounded-md"
          id="sapChieu"
          {...register("sapChieu")}
        />
        {errors.sapChieu && (
          <span className="text-red-600">{errors.sapChieu.message}</span>
        )}
      </td>
    </tr> */}
          {/* <tr>
      <td>
        {" "}
        <label
          htmlFor="dangChieu"
          className="text-lg font-semibold text-purple-600 mr-3"
        >
          Đang chiếu (true/false)
        </label>
      </td>
      <td>
        {" "}
        <input
          type="text"
          className="max-w-[400px] p-2 border border-slate-400 rounded-md"
          id="dangChieu"
          {...register("dangChieu")}
        />
        {errors.dangChieu && (
          <span className="text-red-600">{errors.dangChieu.message}</span>
        )}
      </td>
    </tr>
    <tr>
      <td>
        {" "}
        <label
          htmlFor="hot"
          className="text-lg font-semibold text-purple-600 mr-3"
        >
          Phim nổi bật (true/false)
        </label>
      </td>
      <td>
        {" "}
        <input
          type="text"
          className="max-w-[400px] p-2 border border-slate-400 rounded-md"
          id="hot"
          {...register("hot")}
        />
        {errors.hot && (
          <span className="text-red-600">{errors.hot.message}</span>
        )}
      </td>
    </tr> */}
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
              {imgPreview && (
                <img
                  src={imgPreview}
                  alt="preview_uploadImage"
                  className="h-[30vh] object-cover my-3 rounded-md"
                />
              )}
            </td>
          </tr>
        </table>
        <button className="max-w-[200px] px-3 py-2 bg-purple-300 font-semibold rounded-sm text-purple-900 hover:bg-purple-400">
          Thêm phim
        </button>
      </form>
    </>
  );
};

export default AddMovie;
