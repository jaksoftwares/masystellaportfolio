'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Award, Camera, Pencil, Star } from 'lucide-react';
import { supabase, type Artwork, type Testimonial } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const [featuredArtwork, setFeaturedArtwork] = useState<Artwork[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [artworkRes, testimonialsRes] = await Promise.all([
        supabase
          .from('artwork')
          .select('*')
          .eq('featured', true)
          .order('display_order')
          .limit(3),
        supabase
          .from('testimonials')
          .select('*')
          .eq('featured', true)
          .limit(3),
      ]);

      if (artworkRes.data) setFeaturedArtwork(artworkRes.data);
      if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div className="bg-white">
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight">
                  Bringing Stories
                  <span className="block text-neutral-700">to Life</span>
                </h1>
                <p className="text-xl text-neutral-600 leading-relaxed max-w-xl">
                  Professional artist and journalist crafting captivating portraits, breathtaking landscapes,
                  and compelling visual stories through pencil and lens.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/gallery">
                  <Button size="lg" className="h-12 px-8 text-base">
                    View Gallery
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                    Commission Artwork
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-8 pt-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-neutral-900 rounded-lg">
                    <Pencil className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">Self-Taught Artist</div>
                    <div className="text-sm text-neutral-600">Pencil Specialist</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-neutral-900 rounded-lg">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">Certified Journalist</div>
                    <div className="text-sm text-neutral-600">KIPS & ICM</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] bg-neutral-200">
                <Image
                  src="https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Featured Artwork"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-neutral-200">
                <div className="flex items-center space-x-3">
                  <Award className="h-8 w-8 text-neutral-900" />
                  <div>
                    <div className="font-bold text-2xl text-neutral-900">100+</div>
                    <div className="text-sm text-neutral-600">Artworks Created</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Featured Artwork</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Explore a curated selection of my latest works, showcasing the beauty of portraits,
              landscapes, and nature through detailed pencil artistry.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] bg-neutral-200 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredArtwork.map((artwork) => (
                <Link key={artwork.id} href="/gallery">
                  <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                      <Image
                        src={artwork.image_url}
                        alt={artwork.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="text-sm text-neutral-600 mb-1">{artwork.category}</div>
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                        {artwork.title}
                      </h3>
                      <p className="text-neutral-600 text-sm line-clamp-2">
                        {artwork.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/gallery">
              <Button size="lg" variant="outline">
                View Full Gallery
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">What Clients Say</h2>
            <p className="text-lg text-neutral-600">
              Trusted by collectors, businesses, and art enthusiasts
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-white rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="border-0 shadow-md">
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-neutral-700 mb-6 leading-relaxed">
                      {testimonial.content}
                    </p>
                    <div>
                      <div className="font-semibold text-neutral-900">
                        {testimonial.client_name}
                      </div>
                      <div className="text-sm text-neutral-600">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Commission Your Artwork?</h2>
          <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
            Whether you need a custom portrait, landscape drawing, or professional photography
            and videography services, let's create something beautiful together.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/services">
              <Button size="lg" variant="secondary" className="h-12 px-8">
                View Services & Pricing
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-12 px-8 bg-transparent text-white border-white hover:bg-white hover:text-neutral-900">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
