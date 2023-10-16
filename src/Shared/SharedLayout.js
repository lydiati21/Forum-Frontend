import React from "react";
import Header from "../Pages/Header/Header";
import Footer from "../Pages/Footer/Footer";
import { Outlet } from "react-router-dom";

function SharedLayout() {
  return (
    <>
      <Header/>
      <Outlet />
      <Footer/>
    </>
  );
}

export default SharedLayout;
