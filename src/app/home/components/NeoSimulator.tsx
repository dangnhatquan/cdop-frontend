"use client";

import Image from "next/image";
import { Home, Wallet, Gift, Menu } from "lucide-react";
import Link from "next/link";
import { useWalletStore } from "@utils/hooks/useWallet";
import { formatCurrency } from "@utils/helpers";

export default function NeoSimulator() {
  const { balance } = useWalletStore();

  return (
    <div className="min-h-screen w-screen">
      <div className="min-h-screen bg-gradient-to-b from-green-700 to-green-500 text-white flex flex-col rounded-[2rem] overflow-hidden shadow-xl">
        <div className="w-full max-w-[1280px] px-4 pt-10 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white text-green-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                NT
              </div>
              <div>
                <p className="text-sm opacity-80">Tài khoản chính</p>
                <p className="font-semibold">{formatCurrency(balance)}</p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <Gift size={18} />
              <Menu size={18} />
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-t-[2rem] p-4 text-black overflow-y-auto">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {["Chuyển tiền", "Tiền gửi", "Thẻ", "Khoản vay", "Đổi quà"].map(
              (label) => (
                <div
                  key={label}
                  className="flex-shrink-0 flex flex-col items-center w-20"
                >
                  <div className="bg-green-100 p-3 rounded-full mb-1">
                    <Wallet className="text-green-600" size={20} />
                  </div>
                  <p className="text-xs text-center">{label}</p>
                </div>
              )
            )}
          </div>

          <div className="grid grid-cols-4 gap-3 mt-4">
            <Link
              href="/campaigns"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              <div
                key="veritas"
                className="flex flex-col items-center justify-center rounded-xl p-2 bg-gray-50"
              >
                <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center mb-1">
                  <Image
                    alt="vp-logo"
                    src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Icon-VPBank.png"
                    width={18}
                    height={18}
                  />
                </div>
                <p className="text-[10px] text-center">Quyên góp</p>
              </div>
            </Link>
            {[
              "Giao thông",
              "Thanh toán thẻ",
              "Quản lý đối tác",
              "Mã khuyến mại",
              "Lịch sử giao dịch",
              "Đặc quyền bảo vệ",
              "Xem tất cả",
            ].map((label) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center rounded-xl p-2 bg-gray-50"
              >
                <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center mb-1">
                  <Wallet className="text-green-600" size={18} />
                </div>
                <p className="text-[10px] text-center">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white flex justify-around items-center py-2 border-t rounded-b-[2rem]">
          {[
            { icon: Home, label: "Trang chủ" },
            { icon: Wallet, label: "Tài khoản" },
            { icon: Gift, label: "Thẻ" },
            { icon: Menu, label: "Mở rộng" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center text-gray-500"
            >
              <Icon size={20} />
              <span className="text-[10px] mt-1">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
