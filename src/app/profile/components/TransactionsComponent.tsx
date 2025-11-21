"use client";

import { Campaign, User } from "@models/charity";
import { useGetIdentity, useTable } from "@refinedev/core";
import { EMPTY_STRING } from "@utils/constants";
import { formatCurrency } from "@utils/helpers";
import {
  Avatar,
  Button,
  Table,
  Typography,
  Tabs,
  Statistic,
  Divider,
  Tag,
  Empty,
} from "antd";
import { isNil } from "lodash";
import {
  Mail,
  Calendar,
  Edit,
  Heart,
  TrendingUp,
  Award,
  Clock,
  User2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const { Title, Text } = Typography;

export const TransactionsComponent = () => {
  const { data: user } = useGetIdentity<User>();

  const {
    tableQuery: { data: transactionsData, refetch, isFetching, isError },
  } = useTable({
    resource: "transactions",
    filters: {
      initial: [
        {
          field: "user_id",
          operator: "eq",
          value: user?.id,
        },
      ],
    },
  });

  const transactions = transactionsData?.data ?? [];

  const [activeTab, setActiveTab] = useState("overview");

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const totalDonations = transactions.reduce(
    (sum, t) => sum + parseFloat(t.amount),
    0
  );
  const donationCount = transactions.length;
  const uniqueCampaigns = new Set(transactions.map((t) => t.campaign_id)).size;

  const transactionColumns = [
    {
      title: "Ngày",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (date: string) => (
        <div className="flex flex-col">
          <Text className="text-sm font-medium">
            {new Date(date).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </Text>
          <Text className="text-xs text-gray-500">
            {new Date(date).toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </div>
      ),
    },
    {
      title: "Chiến dịch",
      dataIndex: "campaign",
      key: "campaign",
      render: (campaign: Campaign) => <div>{campaign.title}</div>,
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount: string) => (
        <div>{formatCurrency(parseFloat(amount))}</div>
      ),
    },
    {
      title: "Hoá đơn",
      dataIndex: "receipt_url",
      render: (receipt_url: string) =>
        !isNil(receipt_url) ? (
          <Link href={receipt_url}>Xem thêm</Link>
        ) : (
          EMPTY_STRING
        ),
    },
  ];

  const tabItems = [
    {
      key: "overview",
      label: (
        <span className="flex items-center gap-2">
          <User2 className="w-4 h-4" />
          Tổng quan
        </span>
      ),
      children: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Statistic
                title="Tổng số tiền đã quyên góp"
                value={totalDonations}
                formatter={(value) => formatCurrency(Number(value ?? 0))}
                prefix={<Heart className="text-red-500" />}
                valueStyle={{ color: "#ef4444" }}
              />
            </div>
            <div>
              <Statistic
                title="Số lần quyên góp"
                value={donationCount}
                prefix={<TrendingUp className="text-blue-500" />}
                valueStyle={{ color: "#3b82f6" }}
              />
            </div>
            <div>
              <Statistic
                title="Chiến dịch đã tham gia"
                value={uniqueCampaigns}
                prefix={<Award className="text-green-500" />}
                valueStyle={{ color: "#22c55e" }}
              />
            </div>
          </div>

          <div title="Thông tin cá nhân">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User2 className="w-5 h-5 text-gray-500" />
                <div>
                  <Text className="text-gray-500 text-sm block">Họ và tên</Text>
                  <Text className="font-medium">{user?.name}</Text>
                </div>
              </div>

              <Divider className="my-3" />

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <Text className="text-gray-500 text-sm block">Email</Text>
                  <Text className="font-medium">
                    {user?.email || "Chưa cập nhật"}
                  </Text>
                </div>
              </div>

              <Divider className="my-3" />

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <Text className="text-gray-500 text-sm block">
                    Ngày tham gia
                  </Text>
                  <Text className="font-medium">
                    {user?.created_at
                      ? formatDate(user?.created_at)
                      : EMPTY_STRING}
                  </Text>
                </div>
              </div>

              <Divider className="my-3" />

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <Text className="text-gray-500 text-sm block">
                    Cập nhật lần cuối
                  </Text>
                  <Text className="font-medium">
                    {user?.updated_at
                      ? formatDate(user?.updated_at)
                      : EMPTY_STRING}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "donations",
      label: (
        <span className="flex items-center gap-2">
          <Heart className="w-4 h-4" />
          Lịch sử quyên góp
        </span>
      ),
      children: (
        <div>
          {transactions.length === 0 ? (
            <Empty
              description="Bạn chưa có lịch sử quyên góp nào"
              className="py-12"
            />
          ) : (
            <Table
              size="small"
              dataSource={transactions}
              columns={transactionColumns}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showTotal: (total) => `Tổng ${total} giao dịch`,
              }}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-6xl mx-auto px-4 py-6 md:px-6 lg:px-8">
        <div>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar
              size={120}
              src={user?.avatar_url}
              className="border-4 border-white shadow-lg"
            >
              {user?.name.charAt(0)}
            </Avatar>

            <div className="flex-grow text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
                <div>
                  <Title level={2} className="mb-1">
                    {user?.name}
                  </Title>
                  <Text className="text-gray-600">
                    Thành viên từ{" "}
                    {user?.created_at &&
                      new Date(user?.created_at).toLocaleDateString("vi-VN", {
                        month: "long",
                        year: "numeric",
                      })}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            size="large"
          />
        </div>
      </div>
    </div>
  );
};
