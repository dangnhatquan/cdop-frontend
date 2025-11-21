"use client";

import { Organization } from "@models/charity";
import { IMAGE_FALLBACK } from "@utils/constants";
import { calculateProgress, daysLeft, formatCurrency } from "@utils/helpers";
import { useInteraction } from "@utils/hooks/useInteraction";
import { CAMPAIGN_DETAIL } from "@utils/path";
import {
  Avatar,
  Button,
  Card,
  Col,
  Progress,
  Row,
  Tag,
  Typography,
  Image,
} from "antd";
import { isNil } from "lodash";
import Link from "next/link";
import urlcat from "urlcat";

const { Title, Text, Paragraph } = Typography;

const CampaignCard: React.FC<{ item: any; organization?: Organization }> = ({
  item,
  organization,
}) => {
  const progress = calculateProgress(item.current_amount, item.goal_amount);
  const left = daysLeft(item.end_date);

  const goal = Math.round(parseFloat(item.goal_amount));
  const { viewCampaign, viewOrganization } = useInteraction();

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-md">
      <div>
        <Image
          src={item.media_url}
          className="rounded-t-lg object-cover w-full aspect-[4/3]"
          fallback={IMAGE_FALLBACK}
        />

        <div className="p-4 flex flex-col gap-2">
          <Title level={5} className="!m-0">
            {item.title}
          </Title>

          <Paragraph
            ellipsis={{ rows: 2 }}
            className="!mt-1 !mb-2 text-gray-700"
          >
            {item.description}
          </Paragraph>

          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-2">
              <Avatar
                size={36}
                src={organization?.logo_url}
                className="bg-blue-50 text-blue-600 font-semibold"
              >
                {String(organization?.name || "O").charAt(0)}
              </Avatar>
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
            <div>
              {left !== null && (
                <Tag color="orange" className="text-xs mt-1">
                  Còn {left} Ngày
                </Tag>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row">
                <Text strong className="text-lg block">
                  {formatCurrency(item.current_amount)}
                </Text>
                <Text type="secondary" className="block">
                  / {formatCurrency(goal)}
                </Text>
              </div>
              <Text strong className="block mt-1">
                {progress}%
              </Text>
            </div>
            <Progress
              percent={progress}
              showInfo={false}
              strokeLinecap="round"
            />
          </div>

          <Link
            href={urlcat(CAMPAIGN_DETAIL, { id: item.id })}
            onClick={() => viewCampaign(item.id)}
          >
            <button className="h-12 rounded-xl w-full bg-gradient-to-r from-[#004AAD] to-[#00A499] text-white hover:from-[#0056C1] hover:to-[#00B86B] active:scale-[0.98]">
              Quyên góp
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
