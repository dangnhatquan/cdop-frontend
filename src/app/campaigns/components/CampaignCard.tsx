"use client";

import { IMAGE_FALLBACK } from "@utils/constants";
import { calculateProgress, daysLeft, formatCurrency } from "@utils/helpers";
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

const { Title, Text, Paragraph } = Typography;

const CampaignCard: React.FC<{ item: any }> = ({ item }) => {
  const progress = calculateProgress(item.current_amount, item.goal_amount);
  const left = daysLeft(item.end_date);

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
                src={undefined}
                className="bg-blue-50 text-blue-600 font-semibold"
              >
                {String(item.org_id || "O").charAt(0)}
              </Avatar>
              <Text strong className="block">
                {`Tổ chức ${item.org_id ?? ""}`}
              </Text>
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
                  / {formatCurrency(item.goal_amount)}
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

          <button className="h-12 rounded-xl w-full bg-gradient-to-r from-[#004AAD] to-[#00A499] text-white hover:from-[#0056C1] hover:to-[#00B86B] active:scale-[0.98]">
            Quyên góp
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
