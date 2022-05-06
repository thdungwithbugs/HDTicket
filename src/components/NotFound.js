import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <NavLink to="/">
        <img src="/notFound.png" alt="" className="h-[60vh] mx-auto" />
      </NavLink>
      <h1 className="text-center text-2xl">
        Oops! Page not found 404{" "}
        <NavLink to="/">
          <p className="p-2 bg-purple-300 inline-block text-purple-700 text-lg font-semibold rounded-lg ml-2">
            Back to home
          </p>
        </NavLink>
      </h1>
    </div>
  );
}

export default NotFound;
