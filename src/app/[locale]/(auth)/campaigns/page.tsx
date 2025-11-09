'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CampaignCard from './components/CampaignCard';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { AppPagination } from '@/components/Pagination';

export default function CampaignPage() {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);

  async function fetchData() {
    const res = await fetch(
      `/api/campaigns?q=${search}&category=${category}&page=${page}`
    );
    const json = await res.json();
    setData(json.data);
    setTotal(json.total);
  }

  useEffect(() => {
    fetchData();
  }, [search, category, page]);

  return (
    <div className="max-w-4xl mx-auto p-4 mt-6">
      <h1 className="text-xl font-bold mb-3">Dự án dành cho bạn</h1>
      <Input
        placeholder="Tìm dự án bạn yêu thích..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Tabs value={category} onValueChange={setCategory} className="mt-3">
        <TabsList>
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="Trẻ em">Vì trẻ em</TabsTrigger>
          <TabsTrigger value="Người già">Người già</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {data.map((c) => (
          <CampaignCard key={c.id} {...c} />
        ))}
        <AppPagination
          totalPages={total}
          currentPage={page}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
}
