import { Alert, Button, Input, notification } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../../services/authService";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorService, setErroService] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validateData = (name, value) => {
    let isValid = true;

    switch (name) {
      case "fullName":
        if (!value.trim()) {
          setFullNameError("Họ và tên không được để trống");
          isValid = false;
        } else {
          setFullNameError("");
        }
        break;
      case "email":
        if (!value.trim()) {
          setEmailError("Email không được để trống");
          isValid = false;
        } else {
          if (!validateEmail(value)) {
            setEmailError("Email không hợp lệ");
            isValid = false;
          } else {
            setEmailError("");
          }
        }
        break;
      case "password":
        if (!value.trim()) {
          setPasswordError("Mật khẩu không được để trống");
          isValid = false;
        } else {
          if (value.length < 6) {
            setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
            isValid = false;
          } else {
            setPasswordError("");
          }
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

    const isValidFullName = validateData("fullName", user.fullName);
    const isValidEmail = validateData("email", user.email);
    const isValidPassword = validateData("password", user.password);

    if (isValidFullName && isValidEmail && isValidPassword) {
      setIsLoading(true);
      try {
        const response = await register(user);

        if (response.status === 201) {
          navigate("/login");

          notification.success({
            message: "Thành công",
            description: "Đăng ký tài khoản thành công",
          });
        }
      } catch (error) {
        // Xử lý lỗi
        const responseError = error?.response?.data.email;

        // notification.error({
        //   message: "Cảnh báo",
        //   description: responseError,
        // });

        setErroService(responseError);
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
          Đăng ký tài khoản
        </h2>

        <main className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 relative">
            <label className="font-semibold" htmlFor="fullName">
              Họ và tên
            </label>
            <Input
              status={fullNameError ? "error" : ""}
              onChange={handleChange}
              className="h-10"
              id="fullName"
              name="fullName"
              value={user.fullName}
            />
            {fullNameError && (
              <p className="absolute bottom-[-24px] text-[14px] text-red-500">
                {fullNameError}
              </p>
            )}
          </div>
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
          <div className="flex flex-col gap-2 relative">
            <label className="font-semibold" htmlFor="phone">
              Số điện thoại
            </label>
            <Input
              onChange={handleChange}
              className="h-10"
              id="phone"
              name="phone"
              value={user.phone}
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label className="font-semibold" htmlFor="address">
              Địa chỉ
            </label>
            <Input.TextArea
              onChange={handleChange}
              className="h-10"
              id="address"
              name="address"
              value={user.address}
            />
          </div>

          {/* Hiển thị lỗi ở phía server */}
          {errorService && <Alert message={errorService} type="error"></Alert>}
          <div>
            <Button
              className="w-full h-10"
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              Đăng ký
            </Button>
          </div>
        </main>
        <div className="text-center mt-4">
          Bạn đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-500">
            Đăng nhập
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
