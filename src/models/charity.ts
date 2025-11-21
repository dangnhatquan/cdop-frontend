export interface Campaign {
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
}

export interface Organization {
  id: number;
  name: string;
  category: string;
  description: string;
  contact_email: string;
  created_at: string;
  logo_url?: string;
  rating?: number;
  vote_count?: number;
  website_url?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar_url: string;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
}

export interface IAccount {
  phoneNumber: string;
  name: string;
  avatar: string;
}
