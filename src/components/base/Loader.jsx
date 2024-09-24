import { Spin } from "antd";
import React from "react";

export default function Loader() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[rgba(255,255,255,0.6)]">
        <Spin size="large" />
      </div>
    </>
  );
}
