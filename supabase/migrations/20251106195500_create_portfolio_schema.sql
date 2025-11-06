/*
  # Create Portfolio Schema for MaryStella Knight

  ## Overview
  This migration sets up the complete database schema for a professional artist portfolio website,
  including artwork gallery, services/pricing, testimonials, and contact inquiries.

  ## New Tables
  
  ### `artwork`
  Portfolio pieces with images, descriptions, and categorization
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Artwork title
  - `description` (text) - Detailed description
  - `category` (text) - Type: portrait, landscape, nature, journalism
  - `image_url` (text) - Image URL
  - `year` (text) - Year created
  - `medium` (text) - Drawing medium (pencil, etc)
  - `status` (text) - available, sold, commissioned
  - `featured` (boolean) - Featured on homepage
  - `display_order` (integer) - Sort order
  - `created_at` (timestamptz) - Record creation timestamp

  ### `services`
  Services offered with pricing information
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Service name
  - `description` (text) - Service details
  - `price` (text) - Price information
  - `duration` (text) - Estimated completion time
  - `category` (text) - art, journalism, photography
  - `features` (jsonb) - List of included features
  - `active` (boolean) - Currently offered
  - `display_order` (integer) - Sort order
  - `created_at` (timestamptz) - Record creation timestamp

  ### `testimonials`
  Client testimonials and reviews
  - `id` (uuid, primary key) - Unique identifier
  - `client_name` (text) - Client name
  - `role` (text) - Client role/title
  - `content` (text) - Testimonial text
  - `rating` (integer) - Rating 1-5
  - `featured` (boolean) - Display on homepage
  - `created_at` (timestamptz) - Record creation timestamp

  ### `contact_inquiries`
  Contact form submissions
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Sender name
  - `email` (text) - Sender email
  - `subject` (text) - Inquiry subject
  - `message` (text) - Inquiry message
  - `status` (text) - new, read, responded
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for artwork, services, and testimonials
  - Authenticated write access for contact inquiries
  - Admin access for managing content (future enhancement)
*/

-- Create artwork table
CREATE TABLE IF NOT EXISTS artwork (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  category text NOT NULL,
  image_url text NOT NULL,
  year text DEFAULT '',
  medium text DEFAULT 'Pencil',
  status text DEFAULT 'available',
  featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price text NOT NULL,
  duration text DEFAULT '',
  category text NOT NULL,
  features jsonb DEFAULT '[]'::jsonb,
  active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  role text DEFAULT '',
  content text NOT NULL,
  rating integer DEFAULT 5,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create contact inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE artwork ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for artwork (public read)
CREATE POLICY "Anyone can view artwork"
  ON artwork FOR SELECT
  TO public
  USING (true);

-- RLS Policies for services (public read)
CREATE POLICY "Anyone can view services"
  ON services FOR SELECT
  TO public
  USING (true);

-- RLS Policies for testimonials (public read featured only)
CREATE POLICY "Anyone can view featured testimonials"
  ON testimonials FOR SELECT
  TO public
  USING (featured = true);

-- RLS Policies for contact inquiries (anyone can insert)
CREATE POLICY "Anyone can submit contact inquiry"
  ON contact_inquiries FOR INSERT
  TO public
  WITH CHECK (true);

-- Insert sample artwork
INSERT INTO artwork (title, description, category, image_url, year, medium, featured, display_order) VALUES
('Portrait of Grace', 'A detailed pencil portrait capturing the essence of elegance and poise', 'portrait', 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=800', '2023', 'Graphite Pencil', true, 1),
('Mountain Serenity', 'A breathtaking landscape showcasing the majestic peaks at dawn', 'landscape', 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800', '2023', 'Charcoal & Pencil', true, 2),
('Nature''s Whisper', 'An intricate study of flora with delicate details', 'nature', 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=800', '2024', 'Graphite Pencil', true, 3),
('Cityscape Stories', 'Urban landscape captured through journalistic lens', 'journalism', 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800', '2024', 'Photography', false, 4),
('The Wise Elder', 'Character portrait study showcasing depth and emotion', 'portrait', 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=800', '2023', 'Graphite Pencil', false, 5),
('Coastal Dreams', 'Serene coastal landscape with dramatic lighting', 'landscape', 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=800', '2024', 'Charcoal', false, 6);

-- Insert sample services
INSERT INTO services (title, description, price, duration, category, features, active, display_order) VALUES
('Custom Portrait Drawing', 'Professional pencil portrait from your photographs. Highly detailed and lifelike rendering that captures personality and emotion.', 'From $150', '2-3 weeks', 'art', '["High-quality graphite on premium paper", "Multiple revision rounds", "Digital preview before finalization", "Professional framing available"]'::jsonb, true, 1),
('Landscape Commission', 'Custom landscape artwork featuring your favorite locations or dream destinations.', 'From $200', '3-4 weeks', 'art', '["Detailed pencil or charcoal rendering", "Choice of size up to 18x24 inches", "Two revision rounds", "Certificate of authenticity"]'::jsonb, true, 2),
('Nature Study Drawing', 'Botanical and wildlife artwork with scientific accuracy and artistic beauty.', 'From $120', '2 weeks', 'art', '["Precise detail work", "Educational labels available", "Perfect for home or office", "Eco-friendly materials"]'::jsonb, true, 3),
('Journalism & Documentation', 'Professional camera operation and editing services for events, documentaries, and news coverage.', 'Custom Quote', 'Project-based', 'journalism', '["4K video capability", "Professional editing suite", "Fast turnaround", "Experience with news and events"]'::jsonb, true, 4),
('Photography Services', 'Event photography and portrait sessions with professional editing.', 'From $250/session', '1-2 weeks delivery', 'photography', '["2-hour minimum session", "50+ edited photos", "Online gallery access", "Print-ready high resolution files"]'::jsonb, true, 5);

-- Insert sample testimonials
INSERT INTO testimonials (client_name, role, content, rating, featured) VALUES
('Sarah Mitchell', 'Private Collector', 'MaryStella created the most beautiful portrait of my grandmother. The attention to detail and emotional depth she captured was extraordinary. I will treasure this artwork forever.', 5, true),
('James Odhiambo', 'Gallery Owner', 'As a gallery owner, I''ve seen countless artists. MaryStella''s technical skill combined with her unique artistic vision sets her apart. Her landscapes are museum-quality.', 5, true),
('Linda Kamau', 'Corporate Client', 'We hired MaryStella for our company''s documentary project. Her journalism background and technical expertise resulted in a professional, compelling final product.', 5, true);