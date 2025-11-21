"use client";

import { useTable } from "@refinedev/core";
import { DateFormatter } from "@utils/constants";
import { formatCurrency } from "@utils/helpers";
import { Button, Table, Typography } from "antd";
import dayjs from "dayjs";
import { AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

const { Title } = Typography;

export const TransactionsComponents = () => {
  const {
    tableQuery: { data: transactionsData, refetch, isFetching, isError },
  } = useTable({
    resource: "transactions",
    filters: {
      initial: [
        {
          field: "user_id",
          operator: "eq",
          value: 1,
        },
      ],
    },
  });

  const transactions = transactionsData?.data ?? [];

  if (isFetching) {
    return (
      <div className="min-h-screen w-full max-w-[1280px] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Đang tải ...</p>
        </div>
      </div>
    );
  }

  if (isError || !transactions) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-[1280px] w-full px-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Đã có lỗi xảy ra
          </h2>
          <p className="text-gray-600 mb-4">{isError || "Đã xảy ra lỗi"}</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => window.location.reload()}>Thử lại</Button>
            <Link href="/campaigns">
              <Button>Về trang chủ</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="p-4 w-full max-w-[1280px] flex flex-col gap-4">
        <Title level={4}>Lịch sử quyên góp</Title>
        <Table
          size="small"
          dataSource={transactions}
          loading={isFetching}
          rowKey="id"
          columns={[
            {
              title: "Ngày",
              dataIndex: "timestamp",
              render: (date) => {
                return (
                  <div>
                    <div>{dayjs(date).format(DateFormatter.TIME_24H)}</div>
                    <div>{dayjs(date).format(DateFormatter.VN_DATE)}</div>
                  </div>
                );
              },
            },
            {
              title: "Người ủng hộ",
              dataIndex: "user_id",
              render: (userId: string) => {
                return <div>Người dùng {userId}</div>;
              },
            },
            {
              title: "Dự án",
              dataIndex: "campaign_id",
              render: (campaign_id: string) => {
                return <div>Dự án {campaign_id}</div>;
              },
            },
            {
              title: "Số tiền",
              dataIndex: "amount",
              render: (amt) => formatCurrency(parseFloat(amt)),
            },
          ]}
        />
      </div>
    </div>
  );
};
