import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Artwork = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  year: string;
  medium: string;
  status: string;
  featured: boolean;
  display_order: number;
  created_at: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  features: string[];
  active: boolean;
  display_order: number;
  created_at: string;
};

export type Testimonial = {
  id: string;
  client_name: string;
  role: string;
  content: string;
  rating: number;
  featured: boolean;
  created_at: string;
};

export type ContactInquiry = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
