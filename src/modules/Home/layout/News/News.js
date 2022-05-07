import { Tabs } from "antd";
import React from "react";

const { TabPane } = Tabs;

const News = () => {
  return (
    <>
      <div
        id="tinTuc"
        className="mt-14 max-w-[1280px] mx-auto bg-white bg-opacity-40 pt-10 pb-32 rounded-lg"
      >
        <Tabs defaultActiveKey="1" centered size="large" tabBarStyle={{fontWeight:'bold', color:'#ee9b00'}}>
          <TabPane className="min-h-[300px]" tab="Điện ảnh 24h" key="1">
            <div className="flex flex-wrap flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className=" h-[448px] flex flex-col ">
                  <a
                    href="https://vnexpress.net/giai-tri/phim/thu-vien-phim/fast-feel-love-421"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://i1-giaitri.vnecdn.net/2022/05/01/FastFeelLove-1651404818-6841-1651406204.png?w=680&h=408&q=100&dpr=1&fit=crop&s=D1AM4CtzS39OccuF7VitHg"
                      alt=""
                    />
                  </a>
                  <h1 className="text-purple-600 font-bold text-2xl">
                    Fast & Feel Love: Sống chậm lại để yêu thương
                  </h1>
                  <p>
                    Kao (Nat Kitcharit đóng) giữ kỷ lục nhanh nhất thế giới môn
                    xếp cốc nhưng mất nhiều năm vẫn không thể ngỏ lời yêu Jay
                    (Urassaya Sperbund).
                  </p>
                </div>
                <div className="flex flex-col h-[448px]">
                  <a
                    href="https://vnexpress.net/hon-2-6-trieu-nguoi-ky-don-tay-chay-amber-heard-4458347.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://i1-giaitri.vnecdn.net/2022/05/01/Amber-Heard-Aquaman-5323-1651391574.png?w=1020&h=0&q=100&dpr=1&fit=crop&s=hHXDbl_cgFhbmvWUQ1Rjww"
                      alt=""
                    />
                  </a>
                  <h1 className="text-purple-600 font-bold text-2xl">
                    Hơn 2,6 triệu người ký đơn tẩy chay Amber Heard
                  </h1>
                  <p>
                    Chiến dịch kêu gọi cắt vai của Amber Heard trong bom tấn
                    "Aquaman 2" đạt hơn 2,6 triệu chữ ký.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-5">
                <div className="h-[300px] flex flex-col">
                  <a
                    href="https://vnexpress.net/phim-nghe-sieu-de-thu-10-ty-dong-mot-ngay-4458295.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://i1-giaitri.vnecdn.net/2022/05/01/nghe-sieu-de-1-1653-1651380404.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=yBMDBkuy3P7n5CojRyEGhQ"
                      alt=""
                    />
                  </a>
                  <h1 className="text-purple-600 font-bold text-2xl">
                    Phim 'Nghề siêu dễ' thu 10 tỷ đồng trong một ngày
                  </h1>
                  <p>
                    Theo đại diện CJ - đơn vị phát hành, phim dẫn đầu phòng vé
                    ngày đầu của đợt nghỉ lễ.{" "}
                  </p>
                </div>
                <div className="flex- flex-col h-[300px]">
                  <a
                    href="https://vnexpress.net/loat-phim-ra-rap-thang-5-4458106.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://i1-giaitri.vnecdn.net/2022/05/01/nghe-sieu-de-1-1653-1651380404.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=yBMDBkuy3P7n5CojRyEGhQ"
                      alt=""
                      //   className="h-[277.33px]"
                    />
                  </a>
                  <h1 className="text-purple-600 font-bold text-2xl">
                    Loạt phim hot sắp ra rạp tháng 5, ra rạp xem gì đây
                  </h1>
                  <p>
                    Bom tấn Hollywood "Doctor Strange 2" cùng các phim của Lý
                    Nhã Kỳ, H'Hen Niê ra mắt trong tháng 5.{" "}
                  </p>
                </div>
                <div className=" h-[300px] grid grid-rows-4 gap-y-3">
                  <div className="flex h-[65px] items-center gap-2">
                    <a
                      href="https://vnexpress.net/nghe-si-tien-minh-lam-phim-hoang-tu-ca-4458372.html"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://i1-giaitri.vnecdn.net/2022/05/01/hoang-tu-ca-1-7789-1651396541.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=ZD66E3FArRNzQrPG2whlgA"
                        alt=""
                        className="h-[65px] w-[65px] object-cover"
                      />
                    </a>

                    <h1 className=" font-bold text-sm">
                      Nghệ sĩ Tiến Minh làm phim 'Hoàng tử cá'
                    </h1>
                  </div>
                  <div className="flex h-[65px] items-center gap-2">
                    <a
                      href="https://vnexpress.net/phim-18-bi-che-tham-hoa-4458091.html"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://i1-giaitri.vnecdn.net/2022/04/30/phim-1130-1651310399.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=6Yh3eCZTrR_7JL-XdLbpMg"
                        alt=""
                        className="h-[65px] w-[65px] object-cover"
                      />
                    </a>

                    <h1 className="font-bold text-sm">
                      Phim 18+ bị chê thảm họa
                    </h1>
                  </div>
                  <div className="flex h-[65px] items-center gap-2">
                    <a
                      href="https://vnexpress.net/phim-em-va-trinh-he-lo-canh-trinh-cong-son-gap-khanh-ly-4458146.html"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://i1-giaitri.vnecdn.net/2022/04/30/trinh-cong-son-2-6831-1651326391.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=kxHeeevXEAmu05Qn8Rt6Sg"
                        alt=""
                        className="h-[65px] w-[65px] object-cover"
                      />
                    </a>

                    <h1 className=" font-bold text-sm">
                      Cuộc đời 'Em và Trịnh': Tình yêu và cuộc sống{" "}
                    </h1>
                  </div>
                  <div className="flex h-[65px] items-center gap-2">
                    <a
                      href="https://vnexpress.net/hoat-hinh-ngan-cua-dao-dien-viet-chieu-o-cannes-4456755.html"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://i1-giaitri.vnecdn.net/2022/04/27/SRD-Still-1-1-7038-1651059075.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=Rm20pRF1__RLRqRe48Ow3g"
                        alt=""
                        className="h-[65px] w-[65px] object-cover"
                      />
                    </a>

                    <h1 className="font-bold text-sm">
                      Hoạt hình ngắn Việt Nam chiếu ở Cannes
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Review" key="2">
            Minh họa review...
          </TabPane>
          <TabPane tab="Khuyến mãi" key="3">
            Minh họa khuyến mãi...
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default News;
