import { NextResponse } from 'next/server';

const campaigns = [
  {
    id: 1,
    title: 'Gây quỹ tặng 200 túi an sinh cho người dân và em nhỏ khó khăn bị ảnh hưởng do lũ lụt tại Lạng Sơn',
    organization: 'DNXH Thanh thiếu niên Việt Nam - VYSE',
    raised: 438000,
    target: 200000000,
    daysLeft: 75,
    category: 'Trẻ em',
    image: '/images/campaign1.jpg',
  },
  {
    id: 2,
    title: 'Gây quỹ hỗ trợ người già neo đơn tại các vùng sâu vùng xa',
    organization: 'Quỹ Tấm Lòng Vàng',
    raised: 1200000,
    target: 5000000,
    daysLeft: 45,
    category: 'Người già',
    image: '/images/campaign2.jpg',
  },
  // thêm vài campaign mock khác...
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase() || '';
  const category = searchParams.get('category') || 'all';
  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 6);

  let filtered = campaigns.filter(
    (c) =>
      c.title.toLowerCase().includes(q) &&
      (category === 'all' || c.category === category)
  );

  const start = (page - 1) * limit;
  const end = start + limit;

  return NextResponse.json({
    data: filtered.slice(start, end),
    total: filtered.length,
    page,
    limit,
  });
}
