"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import SuccessLogo from '@/components/illustrations/Success';

const DonationSuccessPage: React.FC = () => {
  const searchParams = useSearchParams();
  
  const amount = searchParams.get('amount');
  const campaignTitle = searchParams.get('campaign');

  const formatCurrency = (amount: string | number) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(numAmount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-lg font-semibold text-center">Thông tin chiến dịch</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        <div className="bg-white rounded-3xl p-8 shadow-sm mb-4">
          <div className='!flex !flex-row justify-center items-center'>
            <SuccessLogo width={300} height={186} />
          </div>
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Quyên góp thành công
            </h2>
            <p className="text-gray-600 leading-relaxed px-4">
              Cảm ơn bạn đã quyên góp cho chiến dịch, điều này thật sự rất có ý nghĩa với chúng tôi. Chúng tôi sẽ gửi email xác nhận về thông tin.
            </p>
          </div>

          {amount && (
            <div className="bg-gray-50 rounded-2xl p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Số tiền ủng hộ</span>
                <span className="text-lg font-bold text-green-600">
                  {formatCurrency(amount)}
                </span>
              </div>
              {campaignTitle && (
                <div className="text-sm text-gray-600 pt-2 border-t border-gray-200">
                  <span className="font-medium">Chiến dịch:</span> {decodeURIComponent(campaignTitle)}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Link href="/campaigns" className="block">
            <Button size="lg" className='w-full' variant="primary">
              Quay lại trang chủ
            </Button>
          </Link>
          <Link href="/donations/history" className="block">
            <Button 
              variant="outline"
              className="w-full"
            >
              Xem hồ sơ của tôi
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonationSuccessPage;