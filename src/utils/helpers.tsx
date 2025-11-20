export const formatCurrency = (
  amount: number,
  currency = "VND",
  locale = "vi-VN"
): string => {
  return `${new Intl.NumberFormat(locale, {
    currency,
  }).format(amount)}đ`;
};

export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function daysLeft(endDate?: string | null) {
  if (!endDate) return null;
  const end = new Date(endDate);
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const diff = Math.ceil((end.getTime() - now.getTime()) / msPerDay);
  return diff >= 0 ? diff : 0;
}

export function calculateProgress(
  current?: string | null,
  goal?: string | null
) {
  const c = Number(current || 0);
  const g = Number(goal || 0);
  if (!g || g <= 0) return 0;
  const p = (c / g) * 100;
  return Math.min(100, Math.round(p));
}

export const getStatusBadge = (status: string) => {
  const statusMap: { [key: string]: { text: string; class: string } } = {
    active: { text: "Đang hoạt động", class: "bg-green-100 text-green-700" },
    draft: { text: "Nháp", class: " text-gray-700" },
    completed: { text: "Hoàn thành", class: "bg-green-100 text-green-700" },
    closed: { text: "Đã đóng", class: "bg-red-100 text-red-700" },
  };
  return statusMap[status] || statusMap.active;
};

export const formatCreatedDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hôm nay";
  if (diffDays === 1) return "Hôm qua";
  if (diffDays < 7) return `${diffDays} ngày trước`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
  return `${Math.floor(diffDays / 30)} tháng trước`;
};

export const calculateDaysLeft = (endDate: string) => {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

export const calculateSupporters = (amount: number) => {
  const avgDonation = 100000;
  return Math.floor(amount / avgDonation);
};
