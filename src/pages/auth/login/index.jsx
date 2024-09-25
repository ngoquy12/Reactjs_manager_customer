import { Alert, Button, Input, notification } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/authService";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const validateData = (name, value) => {
    let isValid = true;

    switch (name) {
      case "email":
        if (!value.trim()) {
          setEmailError("Email không được để trống");
          isValid = false;
        } else {
          setEmailError("");
        }
        break;
      case "password":
        if (!value.trim()) {
          setPasswordError("Mật khẩu không được để trống");
          isValid = false;
        } else {
          setPasswordError("");
        }
        break;
      default:
        break;
    }

    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });

    validateData(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidEmail = validateData("email", user.email);
    const isValidPassword = validateData("password", user.password);

    if (isValidEmail && isValidPassword) {
      setIsLoading(true);

      try {
        const resultAction = await dispatch(login(user));
        const originalPromiseResult = unwrapResult(resultAction);

        console.log("Response: ", originalPromiseResult);

        if (originalPromiseResult.status === 400) {
          notification.error({
            message: "Cảnh báo",
            description: originalPromiseResult.response.data.error,
          });
        } else {
          if (
            originalPromiseResult.roles.some((item) => item === "ROLE_ADMIN")
          ) {
            navigate("/admin");
          } else {
            navigate("/");
          }

          notification.success({
            message: "Thành công",
            description: "Đăng ký tài khoản thành công",
          });
        }
      } catch (error) {
        notification.error({
          message: "Cảnh báo",
          description:
            "Đã có lỗi xảy ra. Vui lòng liên hệ với quản trị viên để được trợ giúp",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-[450px] bg-white px-6 py-5 rounded-xl border shadow-sm"
      >
        <h2 className="text-center text-[24px] font-bold text-gray-900">
          Đăng nhập tài khoản
        </h2>

        <main className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 relative">
            <label className="font-semibold" htmlFor="email">
              Email
            </label>
            <Input
              status={emailError ? "error" : ""}
              onChange={handleChange}
              className="h-10"
              id="email"
              name="email"
              value={user.email}
            />
            {emailError && (
              <p className="absolute bottom-[-24px] text-[14px] text-red-500">
                {emailError}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 relative">
            <label className="font-semibold" htmlFor="password">
              Mật khẩu
            </label>
            <Input
              status={passwordError ? "error" : ""}
              onChange={handleChange}
              className="h-10"
              id="password"
              name="password"
              value={user.password}
            />
            {passwordError && (
              <p className="absolute bottom-[-24px] text-[14px] text-red-500">
                {passwordError}
              </p>
            )}
          </div>

          {/* Hiển thị lỗi ở phía server */}
          {/* {errorService && <Alert message={errorService} type="error"></Alert>} */}
          <div className="mt-6">
            <Button
              className="w-full h-10"
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              Đăng nhập
            </Button>
          </div>
        </main>
        <div className="text-center mt-4">
          Bạn chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-600 hover:text-blue-500">
            Đăng ký
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
