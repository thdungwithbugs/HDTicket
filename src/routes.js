import { lazy } from "react";

const routes = [
  { path: "/", element: lazy(() => import("./modules/Home/pages/HomePage")) },
  { path: "/login", element: lazy(() => import("./modules/Auth/pages/Login")) },
  {
    path: "/register",
    element: lazy(() => import("./modules/Auth/pages/Register")),
  },
  {
    path: "/movies",
    children: [
      {
        path: "now-showing",
        element: lazy(() => import("./modules/Movies/pages/MovieShowing")),
      },
      {
        path: "coming-soon",
        element: lazy(() => import("./modules/Movies/pages/MovieComming")),
      },
      {
        path: ":movieId",
        element: lazy(() => import("./modules/Movies/pages/MovieDetails")),
      },
    ],
  },
];

export default routes;
