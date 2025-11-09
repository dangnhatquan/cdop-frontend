export interface ICampaign {
   id: number;
  title: string;
  description: string;
  goal_amount: string;
  current_amount: string;
  status: string;
  start_date: string;
  end_date: string;
  created_at: string;
  media_url: string;
  org_id: number;
  category?: string;
}

export interface CampaignUI extends ICampaign {
  organizer?: string;
  verified?: boolean;
  supporters?: number;
  location?: string;
  gallery?: string[];
}

export interface CampaignCardData {
  id: string;
  title: string;
  organization: string;
  raised: number;
  target: number;
  daysLeft: number;
  image: string;
}

export interface ApiResponse {
  data: ICampaign[];
  total: number;
  currentPage: number;
  totalItems: number;
}