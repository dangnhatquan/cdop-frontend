"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import SuccessLogo from "@/components/illustrations/Success";
import { formatCurrency } from "@utils/helpers";
import { isNil } from "lodash";
import { Button } from "antd";

const DonationSuccessPage: React.FC = () => {
  const searchParams = useSearchParams();

  const amount = searchParams.get("amount");
  const campaignTitle = searchParams.get("campaign");
  const formatted = isNil(amount) ? 0 : parseInt(amount);

  return (
    <div className="min-h-screen">
      <div className="max-w-[1280px] w-full p-4 flex flex-col gap-4">
        <div className="bg-white rounded-3xl flex flex-col gap-4">
          <div className="!flex !flex-row justify-center items-center">
            <SuccessLogo width={300} height={186} />
          </div>
          <div className="text-center ">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Quyên góp thành công
            </h2>
            <p className="text-gray-600 leading-relaxed px-4">
              Cảm ơn bạn đã quyên góp cho chiến dịch, điều này thật sự rất có ý
              nghĩa với chúng tôi. Chúng tôi sẽ gửi email xác nhận về thông tin.
            </p>
          </div>

          {amount && (
            <div className=" rounded-2xl p-4 ">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Số tiền ủng hộ</span>
                <span className="text-lg font-bold text-green-600">
                  {formatCurrency(formatted)}
                </span>
              </div>
              {campaignTitle && (
                <div className="text-sm text-gray-600 pt-2 border-t border-gray-200">
                  <span className="font-medium">Chiến dịch:</span>{" "}
                  {decodeURIComponent(campaignTitle)}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Link href="/campaigns" className="block">
            <Button size="large" className="w-full" type="primary">
              Quay lại trang chủ
            </Button>
          </Link>
          <Link href="/donations/history" className="block">
            <Button size="large" className="w-full">
              Xem hồ sơ của tôi
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonationSuccessPage;
