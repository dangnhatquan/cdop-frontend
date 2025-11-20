import { Spin } from "antd";

export default function Loading() {
  return (
    <div className="relative loading !w-[100vw] !h-[100vh] bg-ivory z-[99999]">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Spin spinning={true} size="large" />
      </div>
    </div>
  );
}
