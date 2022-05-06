import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { getTheaters } from "modules/Home/slices/theater";
import { NavLink } from "react-router-dom";
import { FacebookOutlined, LinkedinOutlined } from "@ant-design/icons";

const Footer = () => {
  const { data, isLoading, error } = useSelector((state) => state.theater);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTheaters());
  }, []);

  if (isLoading) {
    return (
      <div className="w-10 h-10 rounded-full border-4 border-violet-800 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
    );
  }

  if (error) {
    return <p>{error || "Something went wrong"}</p>;
  }

  const arrIconFooter = _.map(data, (item) =>
    _.pick(item, ["maHeThongRap", "tenHeThongRap", "logo"])
  );
  // console.log(arrIconFooter);

  return (
    <footer className="py-6 dark:bg-coolGray-800 dark:text-coolGray-50 bg-purple-200">
      <div className="container px-6 mx-auto space-y-6 divide-y divide-coolGray-400 md:space-y-12 divide-opacity-50">
        <div className="grid grid-cols-12">
          <div className="pb-6 col-span-full md:pb-0 md:col-span-6 ">
            <NavLink
              to="/"
              className="flex justify-center space-x-3 md:justify-start text-black"
            >
              <div className="flex items-center justify-center dark:bg-violet-400">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="Back to homepage"
                  className="flex items-center p-2"
                >
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABNVBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////7QibkNivkNCn/+/v9q577Si/+8/L/7uz62tj8jHvvh4D8g3HqX1bMzc37SC3Rvrv+9/bwkozsbVn/8/HMzc7kOS7mOyW/LSP+8O/5y8joUkj8QibvgXr8/f35+frQ0ND5SS/iNSrYMyj9ppnQMSb39vbg39/W1tbfNCnHLyT//fz9+fjv7+/8qZzwPSbz8/Pr6+vn5+fj4+Pb29v6xsLyopr5opTnnJHhlIj7Ryz+6ef9rqP0qaH5UzrlOjD7RSnqOyW6KyL/4t3kz8zgzcrQtrP9tar9sqfte3TCd3L6emftbVrsbFnpUj3mQjgGeX2GAAAAF3RSTlMA+9EF9vDruKakj2lPSS8sGQ3i4b69OIta07gAAAM+SURBVGje1drpUhNBFIbhnuwrYe9JIIoLERQJqAkkJmELsqNsIu77/V+CJrH8JsxUf52R6SrfG3iqq7t/nSOchXPpZChmyX/KioWS6VxYeDeSSYwSQBsaTWRGPIhwNh6RN1gknnWdZjgVlTdcNDXcbwyNywAaH3IakyEZSKFJGEPM8K/8PcvwhAysiT/3Ek7JAEv13lg2KgMsmu3+wbgMtHjnV2YiMtAiGSHCCRlwibDIjcmAG8uJtCUDzkqLpAy8pAjJwAuJmAy8mLBk4FlCGuh/QZrtilTEkJnzOW7srK20qqfTt30iM/cfz1OluTY7u/D+q31PoQiVUShQpXrw23jw3bZVilAZ+TxTqq2O8dC2lYpQGkyp7MNQKEJlUGVvBYZCEQqDKrswlIpQGExpw1ArghpQ3I8XBhSOwKBK9QAGUYTKgJI/cj9eGEwRKgPIk2XX44VBFaFtzG05jb0FGFQRusbSs+694PHCoIrQNpy334ZBFSDccL6xnTUYXAHCDShNGHqK0DWgVA9w51wBwg0olRYMTUVoGlBaKzA0FaE0fh72DFRrfPnwTcuAAuSo4HWQ056BGlflH09tVycXl7ar4uF15NbdvFt5PX/4Oe+sflVetD2M7XevVl3G9BQQLwVMoc8olxdxDnTxtrIPBQaQPkXZOoz+Lo+nKntQYAAhCowNGNcqPZ+Suy+hwACipdRgeCttKDCA6Ci1RtdQKTtdBQYQXaVnqJXm0SoMF0KVWp0YHWVLVs+LMFwIU+obHYMox1ty81OxBAMIUWDQTjrKxzMYQBQKHi/+ObuXzU3JESgwGjCIMi2RA+FKDQZFzrQQKHhY3MAf9EaoUn/j1wDClHX/BhCi1F74N4AQxafBESh+DY5A8W1wBMod7f8BQxNBj6BQgyH8LNxgCFe4QRGucIMjXOEGR+jt87fLEa5wgyNc4QZHuMINjnCFGxzhCjc4whVucIQr3OAIV7jBEa5wgyNcgaEfRhuDKKWBDAtDmgGU0jYMjWIYN+kqMHQLYXCmrRRh6JUcfAS4tDygYaWNDDONjGVNDJiNjMpNDP2NrC+YWMQwsVJiYjnGxJqPiYUlE6tXRpfIjKzD/QKIj6Xp8VGBdwAAAABJRU5ErkJggg=="
                    alt="logoTix"
                    className="w-[50px] h-[50px] cursor-pointer"
                  />
                </a>
              </div>
              <span className="self-center text-2xl font-semibold text-purple-600">
                HD Ticket
              </span>
            </NavLink>
          </div>
          <div className="col-span-6 text-center md:text-left md:col-span-3 ">
            <p className="pb-1 text-lg font-medium text-white bg-purple-400 inline-block py-1 px-2 rounded-lg">
              Đối tác
            </p>
            <div className="grid grid-cols-5">
              {arrIconFooter.map((systems, index) => {
                return (
                  <div key={index}>
                    <img
                      src={systems.logo}
                      alt={systems.tenHeThongRap}
                      className="w-[40px] h-[40px] object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="grid justify-center pt-6 lg:justify-between">
          <div className="flex flex-col self-center text-sm text-center md:block lg:col-start-1 md:space-x-6">
            <span>
              ©2022 All rights reserved. This is simple movie booking website
              cloned by Hoang Dung.
            </span>
          </div>
          <div className="flex justify-center pt-4 space-x-4 lg:pt-0 lg:col-end-13">
            <a
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/ho%C3%A0ng-d%C5%A9ng-tr%C6%B0%C6%A1ng-a40a86185/?challengeId=AQGWDhutL8KbRAAAAYCAfD9KWBBk7aGxKk93Zkw-RskfX2fb5PZhE-Izq0mZ4qdeTirIFjPf5Cnnvp0x0GReobm7yHvR7m7huw&submissionId=01605bc6-8708-eb16-a179-1a12b330b561"
              target="_blank"
              title="LinkedIn"
              className="flex items-center justify-center w-10 h-10 rounded-full dark:bg-violet-400 dark:text-coolGray-900"
            >
              <LinkedinOutlined />
            </a>
            <a
              rel="noopener noreferrer"
              href="https://www.facebook.com/dung.hoangtruong.5/"
              target="_blank"
              title="FaceBook"
              className="flex items-center justify-center w-10 h-10 rounded-full dark:bg-violet-400 dark:text-coolGray-900"
            >
              <FacebookOutlined />
            </a>
            <a
              rel="noopener noreferrer"
              href="https://github.com/thdungwithbugs"
              target="_blank"
              title="GitHub"
              className="flex items-center justify-center w-10 h-10 rounded-full dark:bg-violet-400 dark:text-coolGray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
