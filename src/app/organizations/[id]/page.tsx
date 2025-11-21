"use client";

import { Organization } from "@models/charity";
import { BaseKey, useOne } from "@refinedev/core";
import { useInteraction } from "@utils/hooks/useInteraction";
import { Tag, Rate, Divider, Button, Spin, Empty } from "antd";
import {
  Globe,
  Mail,
  Calendar,
  Users,
  Star,
  Heart,
  TrendingUp,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

const categoryColors: Record<string, string> = {
  health: "red",
  education: "blue",
  environment: "green",
  social: "purple",
  animal: "orange",
};

const categoryLabels: Record<string, string> = {
  health: "Y tế",
  education: "Giáo dục",
  environment: "Môi trường",
  other: "Lĩnh vực khác",
};

const OrganizationDetailPage = () => {
  const params = useParams();
  const orgId = params?.id as BaseKey;

  const [like, setLike] = useState(false);

  const toggleLike = () => {
    setLike(!like);
  };

  const { voteOrganization } = useInteraction();

  const { data: organizationData, isFetching } = useOne<Organization>({
    resource: "organizations",
    id: orgId,
    queryOptions: {
      enabled: !!orgId,
    },
  });

  const organization = organizationData?.data;

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Empty description="Không tìm thấy tổ chức" />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-6 ">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src={organization.logo_url}
                alt={organization.name}
                className="w-32 h-32 object-contain rounded-full border border-gray-200"
              />
            </div>

            {/* Organization Info */}
            <div className="flex-grow">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">
                  <div>{organization.name}</div>
                  <Tag
                    color={categoryColors[organization.category] || "default"}
                    className="text-sm"
                  >
                    {categoryLabels[organization.category] ||
                      organization.category}
                  </Tag>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="py-6 flex flex-wrap gap-4">
                <button
                  className=" flex flex-row items-center gap-2"
                  onClick={() => {
                    toggleLike();
                    if (!like) voteOrganization(organization.id);
                  }}
                >
                  {!like ? (
                    <Heart className="w-10 h-10" />
                  ) : (
                    <Heart className="w-10 h-10" fill="#e11d48" stroke="none" />
                  )}{" "}
                  <span className="h-[18px] text-[20px]/6">
                    {!like ? "Vote" : "Voted"}
                  </span>
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <Rate disabled defaultValue={organization.rating} allowHalf />
                <span className="text-gray-600 flex flex-row items-center">
                  <span className="font-semibold text-gray-900">
                    {organization.rating}
                  </span>
                  <span className="mx-1">•</span>
                  <span>{organization.vote_count} đánh giá</span>
                </span>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col gap-2">
                {organization.website_url && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Globe className="w-5 h-5 " />
                    <a
                      href={organization.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" hover:text-blue-800 hover:underline"
                    >
                      {organization.website_url}
                    </a>
                  </div>
                )}
                {organization.contact_email && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="w-5 h-5 " />
                    <a
                      href={`mailto:${organization.contact_email}`}
                      className=" hover:text-blue-800 hover:underline"
                    >
                      {organization.contact_email}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>Tham gia từ {formatDate(organization.created_at)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-600">
                  Chiến dịch đã tham gia
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 " />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-600">Lượt ủng hộ</div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">0 đ</div>
                <div className="text-sm text-gray-600">
                  Đã ủng hộ và đóng hành
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="text-[16px]/5 mb-4 font-semibold">Giới thiệu</div>
        <div>
          <div className="prose max-w-none">
            {organization.description.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-700 leading-relaxed mb-4 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetailPage;
