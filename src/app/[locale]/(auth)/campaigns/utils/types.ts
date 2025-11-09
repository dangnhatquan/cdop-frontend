export interface Campaign {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  goalAmount: number;
  raisedAmount: number;
  startDate: string;  // ISO string
  endDate: string;    // ISO string
  status: 'active' | 'ended' | 'upcoming';
}
