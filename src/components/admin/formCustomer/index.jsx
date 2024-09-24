import { Button, Input, Radio } from "antd";
import React from "react";
import { IoClose } from "react-icons/io5";

export default function FormCustomer({ onCloseForm }) {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <form className="bg-white px-6 py-5 rounded-lg w-full max-w-md">
          <header className="flex items-center justify-between">
            <h2 className="text-2xl font-bold mb-4">Thêm mới khách hàng</h2>
            <IoClose
              onClick={onCloseForm}
              size={24}
              className="cursor-pointer hover:opacity-70"
            />
          </header>
          <div className="mb-4">
            <label className="block font-medium mb-2">Tên</label>
            <Input />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Giới tính</label>
            <Radio.Group>
              <Radio>Nam</Radio>
              <Radio>Nữ</Radio>
              <Radio>Khác</Radio>
            </Radio.Group>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Ngày sinh</label>
            <Input type="date" />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Email</label>
            <Input />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Địa chỉ</label>
            <Input.TextArea />
          </div>

          <div className="flex justify-end space-x-2">
            <Button onClick={onCloseForm} htmlType="button">
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
