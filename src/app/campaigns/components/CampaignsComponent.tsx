"use client";

import { useState } from "react";
import { useCustom } from "@refinedev/core";
import { API_CAMPAIGNS_RECOMMENDATION } from "@utils/api-routes";

import { Col, Empty, Row, Spin, Typography, Pagination, Input } from "antd";

import urlcat from "urlcat";
import CampaignCard from "./CampaignCard";
import SearchBar from "./SearchBar";

const { Title } = Typography;

export const CampaignsComponent = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const { data, isLoading, isError, error, refetch } = useCustom({
    url: urlcat(API_CAMPAIGNS_RECOMMENDATION, {
      id: 1,
      search: search || undefined,
      page,
      limit: pageSize,
    }),
    method: "get",
    queryOptions: {
      retry: false,
      keepPreviousData: true,
    },
  });

  const recommendations = data?.data?.recommendations ?? [];
  const total = data?.data?.total ?? 0;

  // HANDLE SEARCH SUBMIT
  const onSearchChange = (e: any) => {
    setSearch(e.target.value);
  };

  const onSearchSubmit = () => {
    setPage(1);
    refetch();
  };

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center">
        <Spin tip="Đang tải..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <Empty
          description={`Lỗi khi tải dữ liệu: ${String(
            (error as any)?.message ?? error
          )}`}
        />
      </div>
    );
  }

  return (
    <div className="p-4 w-full max-w-[1280px] flex flex-col gap-4">
      <Title level={4}>Dự án dành cho bạn</Title>
      <SearchBar
        onChange={onSearchChange}
        value={search}
        onSubmit={onSearchSubmit}
      />
      <div className="flex flex-col gap-4 w-full">
        {recommendations.length === 0 ? (
          <Empty description="Không có dữ án phù hợp" />
        ) : (
          recommendations.map((item: any, idx: number) => (
            <CampaignCard key={idx} item={item} />
          ))
        )}
      </div>
      {total > 0 && (
        <div className="flex justify-center mt-6">
          <Pagination
            current={page}
            pageSize={pageSize}
            total={total}
            showSizeChanger={false}
            onChange={(p) => {
              setPage(p);
              refetch();
            }}
          />
        </div>
      )}
    </div>
  );
};
