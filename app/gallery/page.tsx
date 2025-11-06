'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase, type Artwork } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Filter } from 'lucide-react';

export default function GalleryPage() {
  const [artwork, setArtwork] = useState<Artwork[]>([]);
  const [filteredArtwork, setFilteredArtwork] = useState<Artwork[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: 'all', label: 'All Work' },
    { value: 'portrait', label: 'Portraits' },
    { value: 'landscape', label: 'Landscapes' },
    { value: 'nature', label: 'Nature' },
    { value: 'journalism', label: 'Journalism' },
  ];

  useEffect(() => {
    async function fetchArtwork() {
      const { data, error } = await supabase
        .from('artwork')
        .select('*')
        .order('display_order');

      if (data) {
        setArtwork(data);
        setFilteredArtwork(data);
      }
      setLoading(false);
    }

    fetchArtwork();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredArtwork(artwork);
    } else {
      setFilteredArtwork(artwork.filter((item) => item.category === selectedCategory));
    }
  }, [selectedCategory, artwork]);

  return (
    <div className="bg-white min-h-screen">
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-neutral-900 mb-6">Art Gallery</h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Explore my collection of artwork spanning portraits, landscapes, and nature studies.
            Each piece is crafted with meticulous attention to detail and a passion for capturing beauty.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-neutral-600" />
              <span className="font-semibold text-neutral-900">Filter by Category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category.value
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[3/4] bg-neutral-200 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filteredArtwork.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-neutral-600">No artwork found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArtwork.map((art) => (
                <Card
                  key={art.id}
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                    <Image
                      src={art.image_url}
                      alt={art.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {art.status === 'sold' && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-red-500 text-white">
                          Sold
                        </Badge>
                      </div>
                    )}
                    {art.status === 'available' && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-green-600 text-white">
                          Available
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-neutral-600 capitalize">
                        {art.category}
                      </span>
                      <span className="text-sm text-neutral-500">{art.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">{art.title}</h3>
                    <p className="text-neutral-600 mb-3 leading-relaxed">{art.description}</p>
                    <div className="flex items-center justify-between text-sm text-neutral-500">
                      <span>Medium: {art.medium}</span>
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
          <h2 className="text-4xl font-bold mb-6">Interested in a Commission?</h2>
          <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
            I'm currently accepting commissions for custom portraits, landscapes, and nature drawings.
            Let's work together to create something uniquely yours.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-neutral-900 font-semibold rounded-lg hover:bg-neutral-100 transition-colors"
          >
            Request a Commission
          </a>
        </div>
      </section>
    </div>
  );
}
