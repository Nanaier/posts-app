import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  NavLink,

} from "react-router-dom";
import Users from "../pages/Users";
import HomePage from "../pages/HomePage";
import SinglePost from "../pages/SinglePost";
import SingleUser from "../pages/SingleUser";

const Navigation = () => {


    return(
        <BrowserRouter>
      <nav className="navMenu">
        <div className="navBar">
          <div className="siteName">
            <NavLink to={"/"} className="siteName">
              <h1>Posts App</h1>
            </NavLink>
          </div>
          <div className="links">
              <Link to="/users">
                <h2 >Users</h2>
              </Link>
              <Link to="/">
                <h2 >Posts</h2>
              </Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<Users />} />
        <Route
          path="/post/:id"
          element={<SinglePost />}
        />
        <Route
          path="/user/:id"
          element={<SingleUser/>}
        />
      </Routes>
    </BrowserRouter>
    );
};

export default Navigation;
