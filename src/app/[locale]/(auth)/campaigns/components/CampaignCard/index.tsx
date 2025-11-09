'use client';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Props = {
  id: string;
  title: string;
  organization: string;
  raised: number;
  target: number;
  daysLeft: number;
  image: string;
};

export default function CampaignCard({
  id,
  title,
  organization,
  raised,
  target,
  daysLeft,
  image,
}: Props) {
  const progress = Math.min((raised / target) * 100, 100);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}tr`;
    }
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}k`;
    }
    return amount.toLocaleString('vi-VN');
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm bg-white border border-gray-100 hover:shadow-md transition-shadow">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-44 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80';
          }}
        />
        {daysLeft <= 7 && daysLeft > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Sắp kết thúc
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-gray-500 mt-1">{organization}</p>

        <div className="flex justify-between items-center mt-2 text-xs">
          <span className="text-orange-500 font-medium">
            {daysLeft > 0 ? `Còn ${daysLeft} Ngày` : 'Đã kết thúc'}
          </span>
          <span className="text-green-600 font-medium">
            {progress.toFixed(0)}%
          </span>
        </div>

        <div className="mt-2 flex flex-col gap-1">
          <Progress value={progress} className="h-2 rounded-full" />
          <div className="flex justify-between text-xs mt-1">
            <span className="font-semibold text-gray-900">
              {formatCurrency(raised)}₫
            </span>
            <span className="text-gray-500">
              / {formatCurrency(target)}₫
            </span>
          </div>
          <Link href={`/campaigns/${id}`}>
            <Button variant="primary" className='w-full mt-2' size="sm">
              Quyên góp
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}