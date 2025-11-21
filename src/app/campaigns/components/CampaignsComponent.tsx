"use client";

import { useState } from "react";
import { useCustom, useList } from "@refinedev/core";
import { API_CAMPAIGNS_RECOMMENDATION } from "@utils/api-routes";

import { Empty, Typography, Pagination } from "antd";

import urlcat from "urlcat";
import CampaignCard from "./CampaignCard";
import SearchBar from "./SearchBar";
import Loading from "@components/loading";
import { Organization } from "@models/charity";
import { useDebounce } from "ahooks";

const { Title } = Typography;

export const CampaignsComponent = () => {
  const [value, setValue] = useState<string>();
  const debouncedValue = useDebounce(value, { wait: 500 });

  const [page, setPage] = useState(1);
  const pageSize = 6;

  const { data, isLoading, isError, error, refetch } = useCustom({
    url: urlcat(API_CAMPAIGNS_RECOMMENDATION, {
      user_id: 1,
      k: 100,
      q: debouncedValue || undefined,
    }),
    method: "get",
    queryOptions: {
      retry: false,
      keepPreviousData: true,
    },
  });

  const recommendations = data?.data?.recommendations ?? [];
  const total = data?.data?.total ?? 0;

  const onSearchChange = (value: string) => {
    setValue(value);
  };

  const { data: organizationData } = useList<Organization>({
    resource: "organizations",
  });

  const organizations = organizationData?.data ?? [];

  if (isLoading) {
    return <Loading />;
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
    <div className="min-h-screen ">
      <div className="p-4 w-full max-w-[1280px] flex flex-col gap-4">
        <Title level={4}>Chiến dịch dành cho bạn</Title>
        <SearchBar onChange={onSearchChange} value={value} />
        <div className="flex flex-col gap-4 w-full">
          {recommendations?.length === 0 ? (
            <Empty description="Không có dữ án phù hợp" />
          ) : (
            recommendations?.map((item: any, idx: number) => (
              <CampaignCard
                key={idx}
                item={item}
                organization={organizations.find(
                  (organization) => organization.id === item.org_id
                )}
              />
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
    </div>
  );
};
