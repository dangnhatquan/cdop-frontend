import { API_BASE_URL } from '@/utils/constants';
import { NextRequest, NextResponse } from 'next/server';

function detectCategory(campaign: any): string {
  const text = `${campaign.title} ${campaign.description}`.toLowerCase();
  
  const categoryKeywords: Record<string, string[]> = {
    'Trẻ em': ['trẻ em', 'em nhỏ', 'học sinh', 'thiếu nhi', 'kid', 'children', 'school', 'sách vở', 'books for kids'],
    'Người già': ['người già', 'cao tuổi', 'người cao tuổi', 'neo đơn', 'elderly', 'senior'],
    'Môi trường': ['môi trường', 'cây xanh', 'rừng', 'environment', 'tree', 'plant', 'sông', 'river', 'ô nhiễm', 'pollution'],
    'Y tế': ['y tế', 'bệnh viện', 'health', 'medical', 'hospital', 'thuốc'],
    'Giáo dục': ['giáo dục', 'education', 'học', 'đào tạo'],
  };

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return category;
    }
  }

  return 'Khác';
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('q') || '';
    const category = searchParams.get('category') || 'all';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 10;

    const response = await fetch(`${API_BASE_URL}/campaigns`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    let campaigns = await response.json();

    campaigns = campaigns.map((c: any) => ({
      ...c,
      category: c.category || detectCategory(c),
    }));

    if (search) {
      const searchLower = search.toLowerCase();
      campaigns = campaigns.filter((c: any) =>
        c.title?.toLowerCase().includes(searchLower) ||
        c.description?.toLowerCase().includes(searchLower)
      );
    }

    if (category !== 'all') {
      campaigns = campaigns.filter((c: any) => c.category === category);
    }

    campaigns = campaigns.filter((c: any) => c.status === 'active');

    campaigns.sort((a: any, b: any) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const total = campaigns.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedCampaigns = campaigns.slice(start, end);

    return NextResponse.json({
      data: paginatedCampaigns,
      total: totalPages,
      currentPage: page,
      totalItems: total,
      success: true,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch campaigns', 
        data: [], 
        total: 0,
        currentPage: 1,
        totalItems: 0,
        success: false,
      },
      { status: 500 }
    );
  }
}