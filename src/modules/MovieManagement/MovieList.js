import React, { useEffect } from "react";
import { Table } from "antd";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getShowing } from "modules/Home/slices/movie";
import { CalendarOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { xoaPhim } from "./slices/DeleteMovieSlice";
import { NavLink } from "react-router-dom";

const { Search } = Input;

const MovieList = () => {
  const { data, isLoading, error } = useSelector((state) => state.homeMovie);
  const dispatch = useDispatch();
  // console.log(data);

  //Phòng trường hợp khi admin ko đi vào homePage mà vào thẳng url adminPage
  useEffect(() => {
    dispatch(getShowing());
  }, []);

  if (isLoading) {
    return <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 border-violet-800 mx-auto animate-spin"></div>;
  }
  if (error) {
    return <p>{error || "Something went wrong"}</p>;
  }

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      value: (maPhim, object) => {
        return <span>{maPhim}</span>;
      },
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend", "ascend"],
      width: "10vw",
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      value: (tenPhim, object) => {
        return <span>{tenPhim}</span>;
      },
      width: "15vw",
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Hình ảnh phim",
      dataIndex: "age",
      render: (url, film, i) => {
        return (
          <>
            <img
              src={film.hinhAnh}
              alt={film.tenPhim}
              className="rounded-full object-cover w-[50px] h-[50px]"
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `{https://picsum.phôto/id/${i}/50/50}`;
              }}
            />
          </>
        );
      },
      sorter: (a, b) => a.age - b.age,
      width: "10vw",
    },
    {
      title: "Mô tả phim",
      dataIndex: "moTa",
      value: (moTa, object) => {
        return <span>{moTa}</span>;
      },
      sorter: (a, b) => {
        let moTaPhimA = a.moTa.toLowerCase().trim();
        let moTaPhimB = b.moTa.toLowerCase().trim();
        if (moTaPhimA > moTaPhimB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Thao tác",
      dataIndex: "maPhim",
      render: (text, film) => {
        return (
          <>
            <NavLink
              to={`/admin/update-movie/${film.maPhim}`}
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
                    "Bạn có chắc chắn muốn xóa phim " + film.tenPhim + " không?"
                  )
                ) {
                  dispatch(xoaPhim(film.maPhim)).then(() => {
                    dispatch(getShowing());
                  });
                }
              }}
            >
              <DeleteOutlined />
            </span>
            <NavLink
              to={`/admin/showtimes/${film.maPhim}`}
              key={1}
              className="ml-2 text-2xl"
            >
              <CalendarOutlined style={{color:'red'}} />
            </NavLink>
          </>
        );
      },
      sortDirections: ["descend", "ascend"],
      width: "7vw",
    },
  ];

  const dataSample = data;

  const onSearch = (value) => {
    // console.log(value)
    //call api layDanhSachPhim
    dispatch(getShowing(value))
  };

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <div>
      <Search
        placeholder="input search text"
        enterButton="Tìm phim"
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
        rowKey={"maPhim"}
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

export default MovieList;
