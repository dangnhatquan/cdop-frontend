"use client";

import { useState } from "react";
import {
  Heart,
  Calendar,
  Users,
  Clock,
  ChevronDown,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Avatar, Button, Progress, Table } from "antd";
import {
  calculateDaysLeft,
  calculateSupporters,
  formatCreatedDate,
  formatCurrency,
  getStatusBadge,
} from "@utils/helpers";
import { BaseKey, useOne, useTable } from "@refinedev/core";
import { isEmpty, isNil } from "lodash";
import dayjs from "dayjs";
import { DateFormatter, EMPTY_STRING } from "@utils/constants";
import { Campaign, Organization, User } from "@models/charity";
import { NEXT_PUBLIC_URL } from "@api";
import { CopyToClipboard } from "@components/CopyToClipboardButton";
import { useInteraction } from "@utils/hooks/useInteraction";

const CampaignDetailPage = () => {
  const params = useParams();
  const campaignId = params?.id as BaseKey;

  const [activeTab, setActiveTab] = useState("detail");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [like, setLike] = useState(false);

  const { voteCampaign, viewOrganization } = useInteraction();

  const toggleLike = () => {
    setLike(!like);
  };

  const { data, isLoading, isError } = useOne<Campaign>({
    resource: "campaigns",
    id: campaignId,
    queryOptions: {
      enabled: !isNil(campaignId),
    },
  });

  const campaign = data?.data;

  const orgId = campaign?.org_id;

  const { data: organizationData } = useOne<Organization>({
    resource: "organizations",
    id: orgId,
    queryOptions: {
      enabled: !!orgId,
    },
  });

  const organization = organizationData?.data;

  const {
    tableQuery: { data: transactionsData, refetch, isFetching },
  } = useTable({
    resource: "transactions",
    filters: {
      initial: [
        {
          field: "campaign_id",
          operator: "eq",
          value: campaignId,
        },
      ],
    },
  });

  const transactions = transactionsData?.data ?? [];

  if (isLoading) {
    return (
      <div className="min-h-screen w-full max-w-[1280px] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Đang tải chiến dịch...</p>
        </div>
      </div>
    );
  }

  if (isError || !campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-[1280px] w-full px-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Không thể tải chiến dịch
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

  const raised = campaign.current_amount
    ? parseFloat(campaign.current_amount)
    : 0;
  const goal = Math.round(parseFloat(campaign.goal_amount));
  const percentage = goal > 0 ? (raised / goal) * 100 : 0;
  const daysLeft = calculateDaysLeft(campaign.end_date);
  const createdDate = formatCreatedDate(campaign.created_at);
  const supporters = calculateSupporters(raised);
  const statusBadge = getStatusBadge(campaign.status);

  return (
    <div className="min-h-screen ">
      <div className="w-screen max-w-[1280px] p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-[16px]/5 font-semibold text-gray-900">
            {campaign.title}
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="text-[16px]/5 font-semibold text-gray-900">
              <div className="text-[14px]/5 text-gray-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {createdDate}
              </div>
            </div>
            <div className="flex flex-row justify-end gap-4">
              <button
                className="hover: rounded-lg transition"
                onClick={() => {
                  toggleLike();
                  if (!like) voteCampaign(campaignId as string);
                }}
              >
                {!like ? (
                  <Heart className="w-4 h-4" />
                ) : (
                  <Heart className="w-4 h-4" fill="#e11d48" stroke="none" />
                )}
              </button>
              <CopyToClipboard
                text={`${NEXT_PUBLIC_URL}/campaigns/${campaign.id}`}
              />
            </div>
          </div>
        </div>

        <div className="bg-white ">
          <img
            src={campaign.media_url}
            alt={campaign.title}
            className="w-full h-80 object-cover rounded-xl"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80";
            }}
          />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Avatar
              size={36}
              src={organization?.logo_url}
              className="bg-blue-50 text-blue-600 font-semibold"
            >
              {String(organization?.name || "O").charAt(0)}
            </Avatar>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Link
                  href={`/organizations/${orgId}`}
                  className="font-semibold text-[16px]/5 !text-green-500"
                  onClick={() => {
                    if (!isNil(orgId)) viewOrganization(orgId.toString());
                  }}
                >
                  {organization?.name}
                </Link>
              </div>
              <div
                className={`w-fit text-xs px-2 py-0.5 rounded ${statusBadge?.class}`}
              >
                {statusBadge?.text}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-end mb-2">
              <div className="flex flex-row gap-1">
                <div className="text-gray-900">{formatCurrency(raised)}</div>
                <div className="text-gray-500">/ {formatCurrency(goal)}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-600">
                  {percentage.toFixed(1)}%
                </div>
              </div>
            </div>

            <Progress
              percent={percentage}
              showInfo={false}
              strokeLinecap="round"
            />

            <div className="flex gap-6 text-sm justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5" />
                <div>{supporters} người ủng hộ</div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <div className="leading-[20px]">
                  {daysLeft > 0 ? `Còn ${daysLeft} ngày` : "Đã kết thúc"}
                </div>
              </div>
            </div>
          </div>

          {campaign.status === "in_progress" && (
            <Link href={`/campaigns/${campaign.id}/donate`}>
              <button className="h-12 rounded-xl w-full bg-gradient-to-r from-[#004AAD] to-[#00A499] text-white hover:from-[#0056C1] hover:to-[#00B86B] active:scale-[0.98]">
                Quyên góp
              </button>
            </Link>
          )}

          {campaign.status === "draft" && (
            <Button
              size="large"
              disabled
              className="w-full bg-gray-300 text-gray-500 cursor-not-allowed"
            >
              Chiến dịch chưa công khai
            </Button>
          )}

          {campaign.status === "completed" && (
            <div className="text-center py-3 bg-green-100 rounded-lg">
              <p className="text-green-700 font-semibold">
                Chiến dịch đã hoàn thành mục tiêu!
              </p>
            </div>
          )}
        </div>

        <div className="overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("detail")}
              className={`flex-1 py-4 font-semibold transition-colors ${
                activeTab === "detail"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Chi tiết
            </button>
            <button
              onClick={() => setActiveTab("updates")}
              className={`flex-1 py-4 font-semibold transition-colors ${
                activeTab === "updates"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Cập nhật
            </button>
          </div>
          <div>
            {activeTab === "detail" && (
              <div className="py-4 flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-100 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-1">
                      Ngày bắt đầu
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      {new Date(campaign.start_date).toLocaleDateString(
                        "vi-VN"
                      )}
                    </div>
                  </div>
                  <div className="bg-green-100 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-1">
                      Ngày kết thúc
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      {new Date(campaign.end_date).toLocaleDateString("vi-VN")}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-lg">Mô tả chi tiết</h3>
                  <div
                    className={`text-gray-700 leading-relaxed whitespace-pre-line ${
                      !showFullDescription ? "line-clamp-6" : ""
                    }`}
                  >
                    {campaign.description ||
                      "Chưa có mô tả chi tiết cho chiến dịch này."}
                  </div>
                  {campaign.description &&
                    campaign.description.length > 200 && (
                      <button
                        onClick={() =>
                          setShowFullDescription(!showFullDescription)
                        }
                        className="flex items-center gap-1 text-green-600 hover:text-green-700 font-medium text-sm"
                      >
                        {showFullDescription ? "Thu gọn" : "Xem thêm"}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            showFullDescription ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                </div>
              </div>
            )}

            {activeTab === "updates" && (
              <div className="py-4">
                {isEmpty(transactions) ? (
                  <div className="text-center py-12 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Chưa có cập nhật nào</p>
                    <p className="text-sm mt-1">
                      Các cập nhật về chiến dịch sẽ xuất hiện ở đây
                    </p>
                  </div>
                ) : (
                  <Table
                    size="small"
                    dataSource={transactions}
                    loading={isFetching}
                    rowKey="id"
                    pagination={{
                      pageSize: 10,
                      showTotal: (total) => `Tổng ${total} giao dịch`,
                    }}
                    columns={[
                      {
                        title: "Ngày",
                        dataIndex: "timestamp",
                        render: (date) => {
                          return (
                            <div>
                              <div>
                                {dayjs(date).format(DateFormatter.TIME_24H)}
                              </div>
                              <div>
                                {dayjs(date).format(DateFormatter.VN_DATE)}
                              </div>
                            </div>
                          );
                        },
                      },
                      {
                        title: "Người ủng hộ",
                        dataIndex: "user",
                        render: (user: User) => {
                          return <div>{user.name}</div>;
                        },
                      },
                      {
                        title: "Số tiền",
                        dataIndex: "amount",
                        render: (amount) => formatCurrency(parseFloat(amount)),
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
                    ]}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailPage;
