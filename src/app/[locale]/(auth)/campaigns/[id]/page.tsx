"use client"

import { useState, useEffect } from 'react';
import { Heart, Share2, Calendar, Users, Clock, ChevronDown, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Campaign {
  id: number;
  title: string;
  description: string;
  goal_amount: string;
  current_amount: string;
  status: string;
  start_date: string;
  end_date: string;
  created_at: string;
  media_url: string;
  org_id: number;
}

const CampaignDetailPage = () => {
  const params = useParams();
  const campaignId = params?.id;

  const [activeTab, setActiveTab] = useState('detail');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
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

        const data: Campaign = await response.json();
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

  const calculateDaysLeft = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const formatCreatedDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hôm nay';
    if (diffDays === 1) return 'Hôm qua';
    if (diffDays < 7) return `${diffDays} ngày trước`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
    return `${Math.floor(diffDays / 30)} tháng trước`;
  };

  const calculateSupporters = (currentAmount: string) => {
    const amount = parseFloat(currentAmount);
    const avgDonation = 100000;
    return Math.floor(amount / avgDonation);
  };

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { text: string; class: string } } = {
      active: { text: 'Đang hoạt động', class: 'bg-green-100 text-green-700' },
      draft: { text: 'Nháp', class: 'bg-gray-100 text-gray-700' },
      completed: { text: 'Hoàn thành', class: 'bg-blue-100 text-blue-700' },
      closed: { text: 'Đã đóng', class: 'bg-red-100 text-red-700' }
    };
    return statusMap[status] || statusMap.active;
  };

  const getOrganizerName = (orgId: number) => {
    const orgMap: { [key: number]: string } = {
      1: 'Tổ chức Giáo dục Cộng đồng',
      2: 'Quỹ Bảo vệ Môi trường',
      3: 'Hội Từ thiện Nhân ái',
      4: 'Quỹ Tấm Lòng Vàng',
    };
    return orgMap[orgId] || `Tổ chức #${orgId}`;
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

  const raised = parseFloat(campaign.current_amount);
  const goal = parseFloat(campaign.goal_amount);
  const percentage = goal > 0 ? (raised / goal) * 100 : 0;
  const daysLeft = calculateDaysLeft(campaign.end_date);
  const createdDate = formatCreatedDate(campaign.created_at);
  const supporters = calculateSupporters(campaign.current_amount);
  const organizerName = getOrganizerName(campaign.org_id);
  const statusBadge = getStatusBadge(campaign.status);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/campaigns" className="text-gray-600 hover:text-gray-900">
            ← Quay lại
          </Link>
          <div className="flex gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-6">
          <img 
            src={campaign.media_url} 
            alt={campaign.title}
            className="w-full h-80 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80';
            }}
          />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">
              {organizerName.charAt(0)}
            </div>
            <div className="flex-1 gap-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{organizerName}</span>
              </div>
                <span className="bg-green-100 w-fit text-green-700 text-xs px-2 py-0.5 rounded">
                  ✓ Đã xác minh
                </span>
                <span className={`w-fit text-xs px-2 py-0.5 rounded ${statusBadge?.class} ml-2`}>
                  {statusBadge?.text}
                </span>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {createdDate}
              </div>
            </div>
            
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {campaign.title}
          </h1>

          <div className="mb-6">
            <div className="flex justify-between items-end mb-2">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(raised)}
                </div>
                <div className="text-sm text-gray-500">
                  đạt được / {formatCurrency(goal)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-green-600">
                  {percentage.toFixed(1)}%
                </div>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div 
                className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>

            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span>{supporters} người ủng hộ</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{daysLeft > 0 ? `Còn ${daysLeft} ngày` : 'Đã kết thúc'}</span>
              </div>
            </div>
          </div>

          {campaign.status === 'active' && (
            <Link href={`/campaigns/${campaign.id}/donate`}>
              <Button size="lg" variant="primary" className='w-full'>
                Quyên góp ngay
              </Button>
            </Link>
          )}

          {campaign.status === 'draft' && (
            <Button size="lg" disabled className='w-full bg-gray-300 text-gray-500 cursor-not-allowed'>
              Chiến dịch chưa công khai
            </Button>
          )}

          {campaign.status === 'completed' && (
            <div className="text-center py-3 bg-blue-50 rounded-lg">
              <p className="text-blue-700 font-semibold">Chiến dịch đã hoàn thành mục tiêu!</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('detail')}
              className={`flex-1 py-4 font-semibold transition-colors ${
                activeTab === 'detail'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Chi tiết
            </button>
            <button
              onClick={() => setActiveTab('updates')}
              className={`flex-1 py-4 font-semibold transition-colors ${
                activeTab === 'updates'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Cập nhật
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'detail' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-1">Mục tiêu</div>
                    <div className="text-xl font-bold text-green-600">
                      {formatCurrency(goal)}
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-1">Đã quyên góp</div>
                    <div className="text-xl font-bold text-green-600">
                      {formatCurrency(raised)}
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-1">Ngày bắt đầu</div>
                    <div className="text-lg font-bold text-green-600">
                      {new Date(campaign.start_date).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-1">Ngày kết thúc</div>
                    <div className="text-lg font-bold text-green-600">
                      {new Date(campaign.end_date).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-bold text-lg">Mô tả chi tiết</h3>
                  <div className={`text-gray-700 leading-relaxed whitespace-pre-line ${!showFullDescription ? 'line-clamp-6' : ''}`}>
                    {campaign.description || 'Chưa có mô tả chi tiết cho chiến dịch này.'}
                  </div>
                  {campaign.description && campaign.description.length > 200 && (
                    <button 
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      {showFullDescription ? 'Thu gọn' : 'Xem thêm'}
                      <ChevronDown className={`w-4 h-4 transition-transform ${showFullDescription ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <div className="text-sm text-gray-600 mb-2">ID Chiến dịch</div>
                  <span className="font-mono text-sm bg-gray-100 px-3 py-1 rounded">
                    #{campaign.id}
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'updates' && (
              <div className="space-y-4">
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Chưa có cập nhật nào</p>
                  <p className="text-sm mt-1">Các cập nhật về chiến dịch sẽ xuất hiện ở đây</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailPage;