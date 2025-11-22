"use client";

import React, { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Clock,
  Loader2,
  Users,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, Button, Progress } from "antd";
import Loading from "@components/loading";
import { BaseKey, useGetIdentity, useOne } from "@refinedev/core";
import { Campaign, Organization, User } from "@models/charity";
import { isNil } from "lodash";
import {
  formatCreatedDate,
  formatCurrency,
  getStatusBadge,
} from "@utils/helpers";
import { useWalletStore } from "@utils/hooks/useWallet";
import classNames from "classnames";
import { useInteraction } from "@utils/hooks/useInteraction";

const DonationPage: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(50000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { donate } = useInteraction();

  const { data: user } = useGetIdentity<User>();

  useEffect(() => {
    if (!isNil(user?.name)) setName(user?.name);
    if (!isNil(user?.email)) setEmail(user?.email);
  }, [user]);

  const router = useRouter();
  const params = useParams();
  const campaignId = params?.id as BaseKey;

  const { viewOrganization } = useInteraction();

  const presetAmounts: number[] = [10000, 50000, 100000, 200000];

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

  const percentage: number =
    !campaign?.current_amount || !campaign?.goal_amount
      ? 0
      : (Number(campaign.current_amount) / Number(campaign.goal_amount)) * 100;

  const handleAmountClick = (amount: number): void => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const { withdraw, balance } = useWalletStore();

  const handleCustomAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value.replace(/\D/g, "");
    setCustomAmount(value);
    if (value) {
      setSelectedAmount(parseInt(value));
    }
  };

  const displayAmount: number = customAmount
    ? parseInt(customAmount)
    : selectedAmount;

  const handleDonation = async () => {
    if (!name.trim()) {
      setSubmitError("Vui lòng nhập họ và tên");
      return;
    }
    if (!email.trim()) {
      setSubmitError("Vui lòng nhập địa chỉ email");
      return;
    }
    if (!displayAmount || displayAmount <= 0) {
      setSubmitError("Vui lòng nhập số tiền hợp lệ");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user?.id,
          campaign_id: Number(campaignId),
          amount: displayAmount,
          message: message.trim() || `Ủng hộ từ ${name}`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

      withdraw(displayAmount);
      donate(campaignId);

      router.push(
        `/campaigns/${campaignId}/donate/success?amount=${displayAmount}&campaign=${encodeURIComponent(
          campaign?.title || ""
        )}`
      );
    } catch (err) {
      console.error("Error creating transaction:", err);
      setSubmitError(
        err instanceof Error ? err.message : "Có lỗi xảy ra khi xử lý giao dịch"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !campaign) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center max-w-[1280px] w-full px-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Không thể tải chiến dịch
          </h2>
          <p className="text-gray-600 mb-4">{isError || "Đã xảy ra lỗi"}</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => window.location.reload()}>Thử lại</Button>
            <Link href="/campaigns">
              <Button type="primary">Về trang chủ</Button>
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
  const createdDate = formatCreatedDate(campaign.created_at);
  const statusBadge = getStatusBadge(campaign.status);

  const isOverBudget = displayAmount > balance;

  return (
    <div className="min-h-screen">
      <div className="max-w-[1280px] w-full flex flex-col">
        <div className="bg-white rounded-2xl p-4 ">
          <h2 className="text-center text-gray-700 font-medium mb-3">
            Số tiền bạn muốn ủng hộ
          </h2>

          <div className="text-center mb-6">
            <div
              className={classNames("text-4xl text-green-5000", {
                "text-red-500": isOverBudget,
              })}
            >
              {formatCurrency(displayAmount)}
            </div>
            {isOverBudget && (
              <div className=" text-red-500">Vượt quá số dư hiện tại</div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 mb-6">
            {presetAmounts.map((amount: number) => (
              <button
                key={amount}
                onClick={() => handleAmountClick(amount)}
                className={`py-2.5 px-3 rounded-full text-sm font-medium transition-all ${
                  selectedAmount === amount && !customAmount
                    ? "bg-green-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {formatCurrency(amount)}
              </button>
            ))}
          </div>

          <div className=" text-gray-500">
            Số dư hiện tại: {formatCurrency(balance)}
          </div>
          <input
            type="text"
            value={customAmount}
            onChange={handleCustomAmountChange}
            placeholder="Hoặc nhập số tiền khác"
            className="w-full px-4 py-3  border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div className="bg-white rounded-2xl px-4 pb-4">
          <input
            type="text"
            value={user?.name}
            disabled
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            placeholder="Nhập họ và tên"
            className="w-full px-4 py-3  border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4"
            required
          />

          <input
            type="email"
            value={user?.email}
            disabled
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="Nhập địa chỉ email"
            className="w-full px-4 py-3  border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4"
            required
          />

          <textarea
            value={message}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setMessage(e.target.value)
            }
            placeholder="Lời nhắn của bạn (không bắt buộc)"
            rows={3}
            className="w-full px-4 py-3  border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          />

          <p className="text-xs text-gray-500 mt-3 leading-relaxed">
            Bạn sẽ nhận được email xác nhận về thông tin ủng hộ của mình.
          </p>
        </div>

        <div className="px-4">
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
                  href={`/organizations/${organization?.id}`}
                  className="font-semibold text-[16px]/5 !text-green-500"
                  onClick={() => {
                    if (!isNil(organization?.id))
                      viewOrganization(organization?.id);
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
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {createdDate}
              </div>
            </div>
          </div>
          <div className=" text-gray-900 mb-4">{campaign.title}</div>
          <div>
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
          </div>
        </div>

        <div className="flex gap-3 p-4 ">
          {!isOverBudget && (
            <button
              disabled={isSubmitting}
              onClick={handleDonation}
              className="h-12 rounded-xl w-full bg-gradient-to-r from-[#004AAD] to-[#00A499] text-white hover:from-[#0056C1] hover:to-[#00B86B] active:scale-[0.98]"
            >
              {isSubmitting ? (
                <div className="flex flex-row justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang xử lý...
                </div>
              ) : (
                "Quyên góp"
              )}
            </button>
          )}
        </div>
        <div className="px-4">
          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-800 font-medium">Lỗi</p>
                <p className="text-sm text-red-600">{submitError}</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end px-4">
          <p className="text-sm text-gray-500">
            Powered by <span className="font-semibold">Ethereum</span> · Sepolia
            Testnet
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
