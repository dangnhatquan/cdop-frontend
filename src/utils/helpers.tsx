export const formatCurrency = (
  amount: number,
  currency = "VND",
  locale = "vi-VN"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
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
