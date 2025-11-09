"use client"

import React, { useState } from 'react';
import { ArrowLeft, QrCode } from 'lucide-react';

interface Campaign {
  title: string;
  raised: number;
  goal: number;
  daysLeft: number;
}

const DonationPage: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(50000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const presetAmounts: number[] = [10000, 50000, 100000, 200000];

  const campaign: Campaign = {
    title: "ĐNXH Thanh thiếu niên Việt Nam - VYSE",
    raised: 438000,
    goal: 200000000,
    daysLeft: 75
  };

  const percentage: number = (campaign.raised / campaign.goal) * 100;

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

  const handleAmountClick = (amount: number): void => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(/\D/g, '');
    setCustomAmount(value);
    if (value) {
      setSelectedAmount(parseInt(value));
    }
  };

  const displayAmount: number = customAmount ? parseInt(customAmount) : selectedAmount;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center">
          <button 
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg"
            aria-label="Quay lại"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold ml-2">Quyên góp</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
          <h2 className="text-center text-gray-700 font-medium mb-3">
            Số tiền bạn muốn ủng hộ
          </h2>
          
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-green-500">
              {formatCurrency(displayAmount)} ₫
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            {presetAmounts.map((amount: number) => (
              <button
                key={amount}
                onClick={() => handleAmountClick(amount)}
                className={`flex-1 py-2.5 px-3 rounded-full text-sm font-medium transition-all ${
                  selectedAmount === amount && !customAmount
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {formatCurrency(amount)} ₫
              </button>
            ))}
          </div>

          <input
            type="text"
            value={customAmount}
            onChange={handleCustomAmountChange}
            placeholder="Hoặc nhập số tiền khác"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-center font-medium"
          />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
          <input
            type="text"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            placeholder="Nhập họ và tên"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4"
          />
          
          <input
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="Nhập địa chỉ email"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          
          <p className="text-xs text-gray-500 mt-3 leading-relaxed">
            Bạn sẽ nhận được email xác nhận về thông tin ủng hộ của mình.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm text-gray-900 mb-1">
                {campaign.title}
              </h3>
              <span className="inline-block bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded font-medium">
                Còn {campaign.daysLeft} Ngày
              </span>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-900">
                {formatCurrency(campaign.raised)}₫
              </span>
              <span className="text-xs text-gray-500">
                / {formatCurrency(campaign.goal)}₫
              </span>
              <span className="text-sm font-semibold text-green-600">
                {percentage.toFixed(0)}%
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            className="w-16 h-14 bg-green-500 hover:bg-green-600 rounded-2xl flex items-center justify-center text-white transition-colors shadow-sm"
            aria-label="Hiển thị QR Code"
          >
            <QrCode className="w-6 h-6" />
          </button>
          
          <button className="flex-1 h-14 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white font-semibold rounded-2xl transition-all shadow-sm">
            Ủng hộ
          </button>
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
};

export default DonationPage;