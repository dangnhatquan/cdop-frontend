"use client"

import { useState } from 'react';
import { Heart, Share2, Calendar, MapPin, Users, Clock, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CampaignDetailPage = () => {
  const [activeTab, setActiveTab] = useState('detail');
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Mock data
  const campaign = {
    id: 1,
    title: "Chung tay ủng hộ bà con vùng lũ quét đỉa xã Nậm Nhò đảo Lộng Sơn",
    organizer: "Văn Huyền - VPĐ",
    verified: true,
    raised: 45000000,
    goal: 50000000,
    supporters: 156,
    daysLeft: 30,
    location: "Lộng Sơn",
    createdDate: "15 ngày trước",
    mainImage: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80",
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=80",
      "https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=400&q=80"
    ]
  };

  const percentage = (campaign.raised / campaign.goal) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button className="text-gray-600 hover:text-gray-900">
            ← Quay lại
          </button>
          <div className="flex gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-6">
          <img 
            src={campaign.mainImage} 
            alt={campaign.title}
            className="w-full h-80 object-cover"
          />
          
          <div className="grid grid-cols-3 gap-2 p-4">
            {campaign.gallery.map((img, idx) => (
              <img 
                key={idx}
                src={img} 
                alt={`Gallery ${idx + 1}`}
                className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
              />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">
              {campaign.organizer.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{campaign.organizer}</span>
                {campaign.verified && (
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded">
                    ✓ Đã xác minh
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {campaign.createdDate}
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {campaign.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <MapPin className="w-4 h-4" />
            <span>{campaign.location}</span>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-end mb-2">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(campaign.raised)}
                </div>
                <div className="text-sm text-gray-500">
                  đạt được / {formatCurrency(campaign.goal)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-green-600">
                  {percentage.toFixed(0)}%
                </div>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div 
                className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span>{campaign.supporters} người ủng hộ</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Còn {campaign.daysLeft} ngày</span>
              </div>
            </div>
          </div>

          <Link
            href={`/campaigns/${campaign.id}/donate`}
          >
            <Button size="lg" variant="primary" className='w-full'>
              Quyên góp
            </Button>
          </Link>
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
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-1">Mục tiêu</div>
                    <div className="text-xl font-bold text-gray-900">
                      {formatCurrency(campaign.goal)}
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-1">Đã quyên góp</div>
                    <div className="text-xl font-bold text-green-600">
                      {formatCurrency(campaign.raised)}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-lg">Mô tả chi tiết</h3>
                  <div className={`text-gray-700 leading-relaxed ${!showFullDescription ? 'line-clamp-6' : ''}`}>
                    <p className="mb-4">
                      Trong những ngày vừa qua, đồng bào tại xã Nậm Nhò, huyện Lộng Sơn đã phải hứng chịu hậu quả nặng nề từ trận lũ quét dữ dội. Hàng trăm ngôi nhà bị cuốn trôi, hư hỏng hoàn toàn, nhiều người dân mất đi tài sản, có người còn mất cả người thân.
                    </p>
                    <p className="mb-4">
                      Hiện tại, bà con đang rất cần sự hỗ trợ về nhu yếu phẩm thiết yếu như thực phẩm, nước sạch, quần áo, chăn màn, thuốc men và các vật dụng sinh hoạt cơ bản để vượt qua giai đoạn khó khăn này.
                    </p>
                    <p className="mb-4">
                      Mọi đóng góp của quý vị, dù lớn hay nhỏ, đều là nguồn động viên tinh thần to lớn và là sự giúp đỡ thiết thực để bà con có thể sớm ổn định cuộc sống, xây dựng lại nhà cửa và tương lai.
                    </p>
                    <p className="font-semibold ">
                      Chúng tôi cam kết sử dụng 100% số tiền quyên góp được để hỗ trợ trực tiếp cho bà con vùng lũ, công khai minh bạch từng khoản chi tiêu.
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="flex items-center gap-1 font-medium text-sm"
                  >
                    {showFullDescription ? 'Thu gọn' : 'Xem thêm'}
                    <ChevronDown className={`w-4 h-4 transition-transform ${showFullDescription ? 'rotate-180' : ''}`} />
                  </button>
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