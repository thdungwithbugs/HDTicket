import React, { useEffect } from "react";
import { AppShell, Navbar } from "@mantine/core";
import { NavLink, Outlet } from "react-router-dom";
import Header from "modules/Home/layout/Header/Header";
import { UserOutlined } from "@ant-design/icons";
import { ToastContainer } from "react-toastify";

const AdminLayout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <Header />
      <p className="pt-[94px] pb-[30px] pl-2 m-0 text-2xl font-bold text-white flex items-center gap-3" style={{
        background:'url("https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")', backgroundPosition:'center center'
      }}>
        <>TRANG QUẢN LÝ HD TICKET</>{" "}
        <UserOutlined style={{ fontSize: "35px" }} />{" "}
      </p>
      <AppShell
        padding="md"
        navbar={
          <Navbar width={{ base: 200 }} height="80vh" p="xs">
            <Navbar.Section grow mt="md">
              <NavLink
                to="/admin/add-movie"
                className="text-black text-lg font-semibold block"
                style={({ isActive }) => ({
                  color: isActive ? "rgb(239 68 68)" : "",
                  background: isActive ? "#ffe5d9" : "",
                })}
              >
                Thêm phim
              </NavLink>
            </Navbar.Section>
            <Navbar.Section grow mt="md">
              <NavLink
                to="/admin/movie-list"
                className="text-black text-lg font-semibold block"
                style={({ isActive }) => ({
                  color: isActive ? "rgb(239 68 68)" : "",
                  background: isActive ? "#ffe5d9" : "",

                })}
              >
                Danh sách phim
              </NavLink>
            </Navbar.Section>
            <Navbar.Section grow mt="md">
              <NavLink
                to="/admin/users"
                className="text-black text-lg font-semibold block"
                style={({ isActive }) => ({
                  color: isActive ? "rgb(239 68 68)" : "",
                  background: isActive ? "#ffe5d9" : "",

                })}
              >
                Quản lý người dùng
              </NavLink>
            </Navbar.Section>
          </Navbar>
        }
        //   header={
        //     <Header height={60} p="xs">
        //       <span>HD Ticket Admin Side</span>
        //     </Header>
        //   }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <Outlet />
      </AppShell>
      <ToastContainer />
    </>
  );
};

export default AdminLayout;
