import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { loadUserFromCookie } from "../../../services/authService";
import { Button } from "antd";
import { logout } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const data = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      dispatch(loadUserFromCookie(JSON.parse(token)));
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login");
  };

  return (
    <div>
      <h1>Thông tin cá nhân</h1>
      <ul>
        <li>Fullname: {data?.fullName}</li>
        <li>Email: {data?.email}</li>
        <li>Phone number: {data?.phone}</li>

        <Button onClick={handleLogout}>Đăng xuất</Button>
      </ul>
    </div>
  );
}
