'use client';

import { useEffect, useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CampaignCard from './components/CampaignCard';
import { AppPagination } from '@/components/Pagination';
import { Loader2, Search, AlertCircle } from 'lucide-react';
import { transformCampaignData } from '@/utils/helpers/campaign';
import { ApiResponse, CampaignCardData } from '@/models/campaign';


export default function CampaignPage() {
  const [data, setData] = useState<CampaignCardData[]>([]);
  const [total, setTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        q: debouncedSearch,
        category,
        page: page.toString(),
      });

      const res = await fetch(`/api/campaigns?${queryParams}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch campaigns');
      }

      const json: ApiResponse = await res.json();
      
      const transformedData = json.data.map(transformCampaignData);
      
      setData(transformedData);
      setTotal(json.total);
      setTotalItems(json.totalItems);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, category, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setPage(1);
  }, [category]);

  return (
    <div className="max-w-4xl mx-auto p-4 mt-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Dự án dành cho bạn</h1>
        <p className="text-gray-600 text-sm">
          {totalItems > 0 ? `Tìm thấy ${totalItems} dự án` : 'Đang tải dự án...'}
        </p>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Tìm dự án bạn yêu thích..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs value={category} onValueChange={setCategory} className="mb-6">
        <TabsList className="w-full">
          <TabsTrigger value="all" className="flex-1">
            Tất cả
          </TabsTrigger>
          <TabsTrigger value="Trẻ em" className="flex-1">
            Vì trẻ em
          </TabsTrigger>
          <TabsTrigger value="Người già" className="flex-1">
            Người già
          </TabsTrigger>
          <TabsTrigger value="Môi trường" className="flex-1">
            Môi trường
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-3" />
          <p className="text-gray-600">Đang tải dự án...</p>
        </div>
      )}

      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-12 bg-red-50 rounded-lg">
          <AlertCircle className="w-10 h-10 text-red-500 mb-3" />
          <p className="text-red-600 font-semibold mb-2">Có lỗi xảy ra</p>
          <p className="text-gray-600 text-sm mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Thử lại
          </button>
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 font-semibold mb-2">
            Không tìm thấy dự án nào
          </p>
          <p className="text-gray-500 text-sm">
            Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
          </p>
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {data.map((campaign) => (
              <CampaignCard 
                key={campaign.id}
                id={campaign.id}
                title={campaign.title}
                organization={campaign.organization}
                raised={campaign.raised}
                target={campaign.target}
                daysLeft={campaign.daysLeft}
                image={campaign.image}
              />
            ))}
          </div>

          {total > 1 && (
            <div className="flex justify-center mt-8">
              <AppPagination
                totalPages={total}
                currentPage={page}
                onPageChange={(p) => setPage(p)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}