import React, { useEffect } from "react";
import { Table } from "antd";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { NavLink } from "react-router-dom";
import { getUserList } from "./slices/user";
import { xoaTaiKhoan } from "./slices/DeleteUser";
import { timNguoiDung } from "./slices/FindUser";
const { Search } = Input;

const User = () => {
  const {data, isLoading, error } = useSelector((state) => state.getUser);
  const dispatch = useDispatch();
  // console.log(data);

  //Phòng trường hợp khi admin ko đi vào homePage mà vào thẳng url adminPage
  useEffect(() => {
    dispatch(getUserList());
  }, []);

  if (isLoading) {
    return <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 border-violet-800 mx-auto animate-spin"></div>;
  }
  if (error) {
    return <p>{error || "Something went wrong"}</p>;
  }

  const columns = [
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      value: (user, object) => {
        return <span>{object?.hoTen}</span>;
      },
      sortDirections: ["descend", "ascend"],
      width: "10vw",
    },
    {
      title: "Email",
      dataIndex: "email",
      value: (user, object) => {
        return <span>{object?.email}</span>;
      },
      width: "15vw",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      value: (user, object) => {
        return <span>{object?.soDt}</span>;
      },
      width: "15vw",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Loại",
      dataIndex: "maLoaiNguoiDung",
      value: (user, object) => {
        return <span>{object?.maLoaiNguoiDung}</span>;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Thao tác",
      dataIndex: "taiKhoan",
      render: (text, data) => {
        return (
          <>
            <NavLink
              to={`/admin/update-user/${data.taiKhoan}`}
              key={1}
              className="mr-2 text-2xl"
            >
              <EditOutlined />
            </NavLink>
            <span
              key={2}
              className=" text-2xl cursor-pointer"
              onClick={() => {
                if (
                   window.confirm(
                    "Bạn có chắc chắn muốn xóa tài khoản " + data.hoTen + " không?"
                  )
                ) {
                   dispatch(xoaTaiKhoan(data.taiKhoan)).then(() => {
                     dispatch(getUserList());
                   });
                 }
               }}
            >
              <DeleteOutlined />
            </span>
          </>
        );
      },
      sortDirections: ["descend", "ascend"],
      width: "7vw",
    },
  ];

  const dataSample = data;

  const onSearch = (tuKhoa) => {
    console.log(tuKhoa)
    //dispatch action tìm user
    dispatch(getUserList(tuKhoa))
  };

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return ( 
    <div>
      <Search
        placeholder="input search text"
        enterButton="Tìm người dùng"
        size="large"
        onSearch={onSearch}
        style={{
          width: "30vw",
          marginBottom: "10px",
        }}
      />
      <Table
        columns={columns}
        dataSource={dataSample}
        onChange={onChange}
        className="shadow-xl"
        style={{
          background:
            'url("https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")',
          padding: "30px",
          borderRadius: "8px",
          width: "70vw",
        }}
      />
    </div>
  );
};

export default User;
