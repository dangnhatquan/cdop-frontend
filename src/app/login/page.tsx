"use client";

import { useLogin } from "@refinedev/core";
import { Form, Input, Button, Typography } from "antd";
import {
  Phone,
  Lock,
  ArrowRight,
  CreditCard,
  MessageCircleMore,
  Bell,
  BrainCircuit,
  ScanLine,
  HandCoins,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const { Title, Text } = Typography;

export default function LoginPage() {
  const { mutate: login, isLoading } = useLogin();
  const [form] = Form.useForm();

  const onFinish = (values: { phoneNumber: string; password: string }) => {
    login(values);
  };

  return (
    <div className="min-h-screen w-screen flex flex-row justify-center bg-gradient-to-b from-emerald-500 via-emerald-600 to-blue-900">
      <div className="flex flex-col max-w-[1280px] w-full">
        <div className="flex justify-between items-center p-4 mt-6">
          <div className="flex items-center gap-2">
            <div className="text-white text-xl font-bold">
              <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center mb-1">
                <Image
                  alt="vp-logo"
                  src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Icon-VPBank.png"
                  width={18}
                  height={18}
                />
              </div>
            </div>
            <span className="text-white text-xl font-bold">VPBank NEO</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
          <div className="!text-white font-semibold text-[24px]/7 mb-4 !text-left w-full">
            Đăng nhập
          </div>
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            className="w-full max-w-[1280px]"
            requiredMark={false}
          >
            <Form.Item
              name="phoneNumber"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Số điện thoại không hợp lệ",
                },
              ]}
            >
              <Input
                size="large"
                prefix={<Phone className="w-5 h-5 text-gray-400" />}
                placeholder="Số điện thoại"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password
                size="large"
                prefix={<Lock className="w-5 h-5 text-gray-400" />}
                placeholder="Mật khẩu"
              />
            </Form.Item>

            <div className="flex items-center justify-between mb-6">
              <Button
                type="link"
                className="!text-white/80 !p-0 hover:!text-white"
              >
                Quên mật khẩu?
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                className="h-14 px-12 rounded-full bg-emerald-400 hover:bg-emerald-500 border-0 font-semibold"
              >
                Đăng nhập
              </Button>
            </div>
          </Form>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-[1280px]">
            <button className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center gap-3 border border-white/20 hover:bg-white/20 transition">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <HandCoins color="white" />
              </div>
              <span className="text-white font-medium">Chuyển tiền</span>
            </button>

            <button className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center gap-3 border border-white/20 hover:bg-white/20 transition">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <ScanLine color="white" />
              </div>
              <span className="text-white font-medium">QR Pay</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 px-6 pb-8">
          <button className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center">
              <CreditCard color="white" />
            </div>
            <span className="text-white text-xs">ATM</span>
          </button>

          <button className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center">
              <MessageCircleMore color="white" />
            </div>
            <span className="text-white text-xs">Hỗ trợ</span>
          </button>

          <button className="flex flex-col items-center gap-2 relative">
            <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center">
              <Bell color="white" />
            </div>
            <div className="absolute top-0 right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              17
            </div>
            <span className="text-white text-xs">Thông báo</span>
          </button>

          <button className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center">
              <BrainCircuit color="white" />
            </div>
            <span className="text-white text-xs">Smart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
