import { API_BASE_URL } from '@/utils/constants';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ locale: string; id: string }> } // 👈 Promise<>
) {
  try {
    

    const resolvedParams = await params;

  const id = resolvedParams.id;

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: 'Invalid campaign ID' },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/campaigns/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Campaign not found' },
          { status: 404 }
        );
      }
      throw new Error(`API error: ${response.status}`);
    }

    const campaign = await response.json();

    return NextResponse.json(campaign);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch campaign',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}