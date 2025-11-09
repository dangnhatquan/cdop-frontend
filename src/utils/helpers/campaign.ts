import { CampaignCardData, ICampaign } from "@/models/campaign";

export const ORG_MAP: Record<number, string> = {
  1: 'Tổ chức Giáo dục Cộng đồng',
  2: 'Quỹ Bảo vệ Môi trường',
  3: 'Hội Từ thiện Nhân ái',
  4: 'Quỹ Tấm Lòng Vàng',
  5: 'Hội Chữ Thập Đỏ',
  6: 'Caritas Việt Nam',
};

export const DEFAULT_IMAGES: Record<string, string> = {
  'Trẻ em': 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
  'Người già': 'https://bcp.cdnchinhphu.vn/thumb_w/777/Uploaded/buithuhuong/2020_01_14/anh%20Minh%20Thi.jpg',
  'Môi trường': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
  'Y tế': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
  'Giáo dục': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
  'default': 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80',
};

export function calculateDaysLeft(endDate: string): number {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}

export function getOrganizationName(orgId: number): string {
  return ORG_MAP[orgId] || `Tổ chức #${orgId}`;
}

export function getImageUrl(mediaUrl: string, category?: string): string {
  if (mediaUrl && mediaUrl.startsWith('http')) {
    return mediaUrl;
  }
  return DEFAULT_IMAGES[category || 'default'] || DEFAULT_IMAGES.default || '';
}

export function formatCurrency(amount: number, short: boolean = false): string {
  if (short) {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)}tỷ`;
    }
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}tr`;
    }
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}k`;
    }
    return amount.toLocaleString('vi-VN');
  }

  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Hôm nay';
  if (diffDays === 1) return 'Hôm qua';
  if (diffDays < 7) return `${diffDays} ngày trước`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} tháng trước`;
  return `${Math.floor(diffDays / 365)} năm trước`;
}

export function calculateProgress(current: number, goal: number): number {
  if (goal <= 0) return 0;
  return Math.min((current / goal) * 100, 100);
}

export function estimateSupporters(amount: number, avgDonation: number = 100000): number {
  return Math.floor(amount / avgDonation);
}

export function transformCampaignData(campaign: ICampaign): CampaignCardData {
  return {
    id: campaign.id.toString(),
    title: campaign.title,
    organization: getOrganizationName(campaign.org_id),
    raised: Math.round(parseFloat(campaign.current_amount)),
    target: Math.round(parseFloat(campaign.goal_amount)),
    daysLeft: calculateDaysLeft(campaign.end_date),
    image: getImageUrl(campaign.media_url, campaign.category),
  };
}


export function getStatusBadge(status: string): { text: string; class: string } {
  const statusMap: Record<string, { text: string; class: string }> = {
    active: { text: 'Đang hoạt động', class: 'bg-green-100 text-green-700' },
    draft: { text: 'Nháp', class: 'bg-gray-100 text-gray-700' },
    completed: { text: 'Hoàn thành', class: 'bg-blue-100 text-blue-700' },
    closed: { text: 'Đã đóng', class: 'bg-red-100 text-red-700' },
  };
  return statusMap[status] || statusMap.active || { text: 'Không xác định', class: 'bg-gray-100 text-gray-700' };
}