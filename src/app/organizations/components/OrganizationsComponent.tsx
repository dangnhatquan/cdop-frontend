"use client";

import { NEXT_PUBLIC_URL } from "@api";
import SearchBar from "@app/campaigns/components/SearchBar";
import { CopyToClipboard } from "@components/CopyToClipboardButton";
import { Organization } from "@models/charity";
import { useList } from "@refinedev/core";
import {
  categoryColors,
  categoryLabels,
  IMAGE_FALLBACK,
} from "@utils/constants";
import { useInteraction } from "@utils/hooks/useInteraction";
import { useDebounce } from "ahooks";
import { Card, Tag, Rate, Avatar, Empty, Spin, Input, Select } from "antd";
import { isNil } from "lodash";
import {
  Search,
  Globe,
  Mail,
  Calendar,
  Users,
  TrendingUp,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const OrganizationsComponent = () => {
  const { data: organizationData, isFetching } = useList<Organization>({
    resource: "organizations",
  });

  const organizations = organizationData?.data ?? [];

  const loading = isFetching;

  const [value, setValue] = useState<string>();
  const debouncedValue = useDebounce(value, { wait: 500 });
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { viewOrganization } = useInteraction();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateText = (text: string, maxLength = 150) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };
  const onSearchChange = (value: string) => {
    setValue(value);
  };

  const filteredOrganizations = organizations.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes((debouncedValue || "")?.toLowerCase()) ||
      (org.description || "")
        .toLowerCase()
        .includes((debouncedValue || "")?.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || org.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = organizations.reduce<string[]>((acc, org) => {
    const cat = org.category;
    if (cat && acc.indexOf(cat) === -1) {
      acc.push(cat);
    }
    return acc;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 py-6 md:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Các tổ chức từ thiện
          </h1>
          <p className="text-gray-600 text-lg">
            Khám phá và ủng hộ các tổ chức từ thiện uy tín tại Việt Nam
          </p>
        </div>

        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <SearchBar value={value} onChange={onSearchChange} />
            <Select
              size="large"
              value={selectedCategory}
              onChange={setSelectedCategory}
              className="w-full md:w-48"
              options={[
                { value: "all", label: "Tất cả lĩnh vực" },
                ...categories.map((cat: string) => ({
                  value: cat,
                  label: categoryLabels[cat] || cat,
                })),
              ]}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <div className="flex items-start gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {organizations.length}
                </div>
                <div className="text-sm text-gray-600">Tổ chức</div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-start gap-3">
              <div className="p-3 bg-red-100 rounded-lg">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {organizations.reduce(
                    (sum, org) => sum + (org.vote_count || 0),
                    0
                  )}
                </div>
                <div className="text-sm text-gray-600">Lượt ủng hộ</div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-start gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {(
                    organizations.reduce(
                      (sum, org) => sum + (org.rating || 0),
                      0
                    ) / organizations.length
                  ).toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Đánh giá trung bình</div>
              </div>
            </div>
          </div>
        </div>

        {filteredOrganizations.length === 0 ? (
          <Card>
            <Empty
              description="Không tìm thấy tổ chức nào phù hợp"
              className="py-12"
            />
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrganizations.map((org) => (
              <Link
                href={`/organizations/${org?.id}`}
                onClick={() => {
                  if (!isNil(org?.id)) viewOrganization(org?.id);
                }}
              >
                <div
                  key={org.id}
                  className="p-4 border border-gray-200 rounded-lg"
                  onClick={() => console.log("Navigate to org detail", org.id)}
                >
                  <div className="flex flex-row justify-between items-start">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar
                        src={org?.logo_url ?? IMAGE_FALLBACK}
                        size={64}
                        className="flex-shrink-0 border border-gray-200"
                      >
                        {org.name.charAt(0)}
                      </Avatar>
                      <div className="flex flex-col gap-1">
                        <div className="font-semibold text-[14px]/5 ">
                          {org?.name}
                        </div>
                        {org.category && (
                          <Tag
                            color={
                              categoryColors[org.category.toLowerCase()] ||
                              "default"
                            }
                            className="mb-2 w-fit"
                          >
                            {categoryLabels[org.category.toLowerCase()] ||
                              org.category}
                          </Tag>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-row justify-end gap-4">
                      <CopyToClipboard
                        text={`${NEXT_PUBLIC_URL}/organizations/${org.id}`}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Rate
                      disabled
                      defaultValue={org.rating || 0}
                      allowHalf
                      className="text-sm"
                    />
                    <span className="text-sm text-gray-600">
                      {org.rating ? org.rating.toFixed(1) : "0.0"} (
                      {org.vote_count || 0})
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {truncateText(org.description, 120)}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-gray-100">
                    {org.website_url && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Globe className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <a
                          href={org.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-blue-600 hover:text-blue-800 hover:underline truncate"
                        >
                          {org.website_url.replace(/(^\w+:|^)\/\//, "")}
                        </a>
                      </div>
                    )}
                    {org.contact_email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span className="truncate">{org.contact_email}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span>Tham gia {formatDate(org.created_at)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
