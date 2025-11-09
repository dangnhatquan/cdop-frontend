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

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm bg-white border border-gray-100">
      <img src={image} alt={title} className="w-full h-44 object-cover" />
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
          {title}
        </h3>
        <p className="text-xs text-gray-500 mt-1">{organization}</p>

        <div className="flex justify-between items-center mt-2 text-xs">
          <span className="text-orange-500 font-medium">Còn {daysLeft} Ngày</span>
        </div>

        <div className="mt-2 flex flex-col gap-1">
          <Progress value={progress} className="h-2 rounded-full" />
          <div className="flex justify-between text-xs mt-1">
            <span>{raised.toLocaleString()}₫</span>
            <span>{target.toLocaleString()}₫</span> 
          </div>
          <Link
            href={`/campaigns/${id}`}
          >
            <Button variant="primary" className='w-full'>
              Quyên góp
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
