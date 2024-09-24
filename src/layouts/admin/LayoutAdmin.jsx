import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function LayoutAdmin() {
  const isLogin = true;
  return <>{isLogin ? <Outlet /> : <Navigate to={"/login"} />}</>;
}
