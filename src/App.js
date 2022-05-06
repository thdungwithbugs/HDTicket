// libs
import "./App.css";
import { lazy, Suspense } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import { Global } from "@emotion/react";
// component
import globalStyles from "./globalStyles";
import ErrorBoundary from "components/ErrorBoundary";
import routes from "routes";
import UserProtect from "Protect/UserProtect";
import LoadingFallback from "components/Loading/LoadingFallback";
import { CaretUpOutlined } from "@ant-design/icons";
import AdminProtect from "Protect/AdminProtect";
import AdminLayout from "components/AdminLayout";

// Dùng lazyload để tối ưu tốc độ tải trang
const HomePage = lazy(() => import("./modules/Home/pages/HomePage"));
const LoginPage = lazy(() => import("./modules/Auth/pages/Login"));
const RegisterPage = lazy(() => import("./modules/Auth/pages/Register"));

const MovieDetails = lazy(() => import("./modules/Movies/pages/MovieDetails"));
const Booking = lazy(() => import("modules/Checkout/pages/Booking"));
const NotFound = lazy(() => import("./components/NotFound"));
//admin parts
const MovieList = lazy(() => import("modules/MovieManagement/MovieList"));
const AddMovie = lazy(() => import("modules/MovieManagement/AddMovie"));
const UpdateMovie = lazy(() => import("modules/MovieManagement/UpdateMovie"));
const User = lazy(() => import("modules/UserManagement/User"));
const UpdateUser = lazy(() => import("modules/UserManagement/UpdateUser"));
const ShowTime = lazy(() => import("modules/MovieManagement/ShowTime"));

function App() {
  let element = useRoutes(routes);
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback></LoadingFallback>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/movies">
            <Route path=":movieId" element={<MovieDetails />} />
          </Route>
          <Route
            path="/booking/:ticketId"
            element={
              <UserProtect>
                <Booking />
              </UserProtect>
            }
          />
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              path="movie-list"
              element={
                <AdminProtect>
                  <MovieList />
                </AdminProtect>
              }
            />
            <Route
              path="add-movie"
              element={
                <AdminProtect>
                  <AddMovie />
                </AdminProtect>
              }
            />
            <Route
              path="update-movie/:id"
              element={
                <AdminProtect>
                  <UpdateMovie />
                </AdminProtect>
              }
            />
            <Route
              path="showtimes/:id"
              element={
                <AdminProtect>
                  <ShowTime />
                </AdminProtect>
              }
            />
            <Route
              path="users"
              element={
                <AdminProtect>
                  <User />
                </AdminProtect>
              }
            />
            <Route
              path="update-user/:id"
              element={
                <UpdateUser>
                  <User />
                </UpdateUser>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <div
          className="w-[50px] h-[50px] rounded-full fixed bottom-16 right-16 bg-red-500 cursor-pointer hover:bg-red-400 hover:scale-110 transition-all bg-opacity-70"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <CaretUpOutlined
            style={{
              fontSize: "30px",
              color: "white",
              fontWeight: "bold",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      </Suspense>
      <Global styles={globalStyles} />
    </ErrorBoundary>
  );
}

export default App;
