import React from "react";

const UngDung = () => {
  return (
    <div
      style={{
        padding: "120px 0 80px 0",
        background: "url(ungDung.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        marginTop: "60px",
        // height: '100%',
      }}
    >
      <div className="container" id="ungDung" >
        <div className="flex items-center gap-20">
          <div className="p-[16px]">
            <p className="text-white w-full text-4xl font-bold mb-[8px]">
              Ứng dụng tiện lợi dành cho
            </p>
            <p className="text-white w-full text-2xl font-bold mb-[8px]">
              người yêu điện ảnh
            </p>
            <p className="text-white w-full font-semibold mt-[16px] mb-[50px]">
              Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và
              đổi quà hấp dẫn.
            </p>
            <a
              rel="noreferrer"
              href="https://apps.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197"
              target="_blank"
              className="bg-[#fb4226] text-white font-semibold text-lg rounded-md p-3"
            >
              <span className="w-full">App miễn phí - Tải về ngay</span>
            </a>
            <p className="text-white w-full pt-4 mb-2">
              TIX có hai phiên bản{" "}
              <a
                className="jss136"
                rel="noreferrer"
                target="_blank"
                href="https://apps.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197"
              >
                IOS
              </a>{" "}
              <span>và</span>{" "}
              <a
                className="jss136"
                rel="noreferrer"
                target="_blank"
                href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123"
              >
                Android
              </a>
            </p>
          </div>
          <div className="relative m-auto">
            <img src="iphone.png" alt="" className="h-[400px]" />
            <img
              src="tix.jpg"
              alt=""
              className="absolute top-0 left-0 rounded-lg scale-90"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UngDung;
