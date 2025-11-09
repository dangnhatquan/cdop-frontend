"use client"

import React, { useEffect, useState } from 'react';
import { AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ICampaign } from '@/models/campaign';

const DonationPage: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(50000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const params = useParams();
  const router = useRouter();
  const campaignId = params?.id;

  const presetAmounts: number[] = [10000, 50000, 100000, 200000];

  const [campaign, setCampaign] = useState<ICampaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      if (!campaignId) {
        setError('Campaign ID is missing');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/campaigns/${campaignId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Không tìm thấy chiến dịch');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ICampaign = await response.json();
        setCampaign(data);
      } catch (err) {
        console.error('Error fetching campaign:', err);
        setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [campaignId]);

  const formatCurrency = (amount: string | number) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(numAmount);
  };

  const percentage: number = !campaign?.current_amount || !campaign?.goal_amount ? 0 : ((Number(campaign.current_amount) / Number(campaign.goal_amount)) * 100);

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

  const handleDonation = async () => {
    if (!name.trim()) {
      setSubmitError('Vui lòng nhập họ và tên');
      return;
    }
    if (!email.trim()) {
      setSubmitError('Vui lòng nhập địa chỉ email');
      return;
    }
    if (!displayAmount || displayAmount <= 0) {
      setSubmitError('Vui lòng nhập số tiền hợp lệ');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 1,
          campaign_id: Number(campaignId),
          amount: displayAmount,
          message: message.trim() || `Ủng hộ từ ${name}`,
          timestamp: new Date().toISOString(),
          status: "new",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Transaction created:', data);

      // Navigate to success page
      router.push(`/campaigns/${campaignId}/donate/success?amount=${displayAmount}&campaign=${encodeURIComponent(campaign?.title || '')}`);

    } catch (err) {
      console.error('Error creating transaction:', err);
      setSubmitError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi xử lý giao dịch');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Đang tải chiến dịch...</p>
        </div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Không thể tải chiến dịch
          </h2>
          <p className="text-gray-600 mb-4">{error || 'Đã xảy ra lỗi'}</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => window.location.reload()}>
              Thử lại
            </Button>
            <Link href="/campaigns">
              <Button variant="outline">
                Về trang chủ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center">
          <button 
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg"
            aria-label="Quay lại"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold ml-2">Quyên góp</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-800 font-medium">Lỗi</p>
              <p className="text-sm text-red-600">{submitError}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
          <h2 className="text-center text-gray-700 font-medium mb-3">
            Số tiền bạn muốn ủng hộ
          </h2>
          
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-green-500">
              {formatCurrency(displayAmount)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-6">
            {presetAmounts.map((amount: number) => (
              <button
                key={amount}
                onClick={() => handleAmountClick(amount)}
                className={`py-2.5 px-3 rounded-full text-sm font-medium transition-all ${
                  selectedAmount === amount && !customAmount
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {formatCurrency(amount)}
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
            placeholder="Nhập họ và tên *"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4"
            required
          />
          
          <input
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="Nhập địa chỉ email *"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4"
            required
          />

          <textarea
            value={message}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
            placeholder="Lời nhắn của bạn (không bắt buộc)"
            rows={3}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
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
                Ngày kết thúc: {new Date(campaign.end_date).toLocaleDateString('vi-VN')}
              </span>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-900">
                {formatCurrency(campaign.current_amount)}
              </span>
              <span className="text-xs text-gray-500">
                / {formatCurrency(campaign.goal_amount)}
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
          <Button 
            onClick={handleDonation}
            disabled={isSubmitting}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              'Ủng hộ'
            )}
          </Button>
        </div>
        <div className="h-8" />
      </div>
    </div>
  );
};

export default DonationPage;