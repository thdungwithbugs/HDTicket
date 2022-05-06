import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, InputNumber, Select } from "antd";
import { Cascader } from "antd";
import { DatePicker, Space } from "antd";
import {
  getTheaterInfomation,
  layThongTinCumRap,
  layThongTinheThongRap,
  taoLichChieu,
} from "apis/movieAPI";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";

const ShowTime = () => {
  let { id } = useParams();
  const { register, handleSubmit, setValue, control, reset } = useForm({
    defaultValues: {
      maPhim: id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
  });

  //Tạo state chung cho 2 input hệ thống cụm rạp và rạp của từng hệ thống => Đồng nhất input
  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });
  // console.log(state.heThongRapChieu);

  useEffect(() => {
    async function fetchData() {
      try {
        let data = await layThongTinheThongRap();
        // console.log(data);
        setState({
          ...state,
          heThongRapChieu: data,
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleChonHeThongRap = async (values) => {
    console.log(values);
    try {
      let data = await layThongTinCumRap(values);
      setState({ ...state, cumRapChieu: data });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChonCumRap = (values) => {
    console.log(values);
    setValue("maRap", values);
  };

  const onOk = (values) => {
    console.log("time", values);
    setValue("ngayChieuGioChieu", moment(values).format("DD/MM/YYYY hh:mm:ss"));
  };

  const onChangeDate = (values) => {
    setValue("ngayChieuGioChieu", moment(values).format("DD/MM/YYYY hh:mm:ss"));
  };

  const onChangeNumber = (values) => {
      setValue("giaVe", values)
  };

  const onSubmit = async (values) => {
    try {
        const data = await taoLichChieu(values);
        toast.success('Tạo lịch chiếu thành công! Hãy kiểm tra ở trang chủ');
        reset()
    } catch (error) {
        console.log(error)
        toast.error(error)
    }
  };

  return (
    <>
      <h1 className="text-2xl">Tạo lịch chiếu phim</h1>
      <Form
        name="taoLichChieu"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        className="w-[50vw] h-[70vh] p-5"
        labelAlign="left"
        onSubmitCapture={handleSubmit(onSubmit)}
      >
      {/* <Controller name="heThongRap" control={control} render={({field, fieldState})=>( */}
          <Form.Item label="Hệ thống rạp">
          <Select
            options={state.heThongRapChieu?.map((heThong, index) => {
              return {
                label: heThong.tenHeThongRap,
                value: heThong.maHeThongRap,
              };
            })}
            onChange={handleChonHeThongRap}
            placeholder="Chọn hệ thống rạp"
          />
        </Form.Item> 
      
        <Form.Item label="Cụm rạp">
          <Select
            options={state.cumRapChieu?.map((cumRap, index) => {
              return { label: cumRap.tenCumRap, value: cumRap.maCumRap };
            })}
            onChange={handleChonCumRap}
            placeholder="Chọn cụm rạp"
          />
        </Form.Item>
        <Form.Item label="Thời gian chiếu">
          <DatePicker
            format="DD/MM/YYYY hh:mm:ss"
            showTime
            onChange={onChangeDate}
            onOk={onOk}
          />
        </Form.Item>
        <Form.Item label="Chọn giá vé">
          <InputNumber
            onChange={onChangeNumber}
          />
        </Form.Item>
        <Form.Item>
          <Button
            className="text-xl bg-red-400"
            size="large"
            htmlType="submit"
            style={{
              background: "rgb(252 165 165)",
              border: "none",
              fontWeight: 700,
              color: "rgb(126 34 206 )",
            }}
          >
            Tạo lịch chiếu
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ShowTime;
