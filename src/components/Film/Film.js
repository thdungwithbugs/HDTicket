import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Modal, Button } from "antd";

const Film = ({ data }) => {
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
    <div key={data.maPhim}>
      <div className="max-w-xs p-6 rounded-md shadow-md dark:bg-coolGray-900 dark:text-coolGray-50 flex flex-col mb-4 hover:shadow-indigo-500/60 hover:animate-wiggle">
        <img
          src={data.hinhAnh}
          alt={`${data.tenphim} thumnail`}
          className="object-cover object-center w-full rounded-md h-72 text-xl dark:bg-coolGray-500 flex-shrink-0"
        />
        <div className="flex flex-col justify-between flex-1">
          <div className="mt-4 mb-2 ">
            <h2 className="text-xl font-semibold tracking-wide text-purple-800 h-[56px]">
              {data.tenPhim}
            </h2>
          </div>
          <div>
            {" "}
            <p className="dark:text-coolGray-100 line-clamp-2 h-[48px]">
              {data.moTa}
            </p>
            <NavLink
              to={`/movies/${data.maPhim}`}
              className="text-center inline-block bg-purple-200 text-purple-700 rounded-lg font-bold text-lg py-2 px-4 hover:bg-purple-300"
            >
              Đặt vé
            </NavLink>
            <Button
              onClick={showModal}
              className="text-center inline-block bg-red-200 text-red-500 rounded-lg font-bold text-lg py-2 px-4 ml-2 hover:bg-red-300"
              style={{
               fontSize:'1.125rem',
               fontWeight:'700',
               color:'#e76f51',
               border: 'none',
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
    </div>
  );
};

export default Film;
