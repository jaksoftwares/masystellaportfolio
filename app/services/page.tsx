'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { supabase, type Service } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('active', true)
        .order('display_order');

      if (data) {
        setServices(data);
      }
      setLoading(false);
    }

    fetchServices();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-neutral-900 mb-6">Services & Pricing</h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Professional artwork and media services tailored to your needs. Each project is approached
            with dedication to quality and attention to detail.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-96 bg-neutral-200 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service) => (
                <Card
                  key={service.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge
                        variant="secondary"
                        className="bg-neutral-900 text-white capitalize"
                      >
                        {service.category}
                      </Badge>
                      {service.duration && (
                        <span className="text-sm text-neutral-500">{service.duration}</span>
                      )}
                    </div>
                    <CardTitle className="text-2xl text-neutral-900 mb-2">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-base text-neutral-600 leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-grow flex flex-col justify-between">
                    <div className="mb-6">
                      <div className="text-3xl font-bold text-neutral-900 mb-6">
                        {service.price}
                      </div>

                      {service.features && service.features.length > 0 && (
                        <div className="space-y-3">
                          <p className="font-semibold text-neutral-900 mb-3">What's included:</p>
                          {service.features.map((feature, index) => (
                            <div key={index} className="flex items-start">
                              <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-neutral-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <Link href="/contact" className="w-full">
                      <Button className="w-full h-12 text-base">
                        Request Quote
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Commission Process</h2>
            <p className="text-lg text-neutral-600">
              A simple, transparent process from concept to completion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-neutral-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Initial Consultation</h3>
              <p className="text-neutral-600">
                Discuss your vision, requirements, and preferences
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-neutral-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Quote & Agreement</h3>
              <p className="text-neutral-600">
                Receive a detailed quote and timeline for your project
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-neutral-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Creation & Updates</h3>
              <p className="text-neutral-600">
                Regular progress updates with opportunities for feedback
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-neutral-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Delivery</h3>
              <p className="text-neutral-600">
                Final approval and secure delivery of your artwork
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-6 text-center">Custom Projects</h2>
              <div className="space-y-4 text-neutral-300 leading-relaxed mb-8">
                <p>
                  Looking for something unique? I welcome custom projects and special requests.
                  Whether you need a series of artworks, a specific size not listed, or have a
                  unique vision in mind, I'm here to help bring it to life.
                </p>
                <p>
                  All prices are starting rates and may vary based on size, complexity, and
                  specific requirements. Contact me for a personalized quote tailored to your needs.
                </p>
              </div>
              <div className="text-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="h-12 px-8"
                  >
                    Discuss Your Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-neutral-900 mb-2">
                  How long does a commission take?
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  Timeline varies by project complexity. Portrait drawings typically take 2-3 weeks,
                  landscapes 3-4 weeks, and nature studies about 2 weeks. Rush orders may be
                  available for an additional fee.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-neutral-900 mb-2">
                  What materials do you use?
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  I work primarily with professional-grade graphite and charcoal pencils on premium
                  acid-free paper. All materials are archival quality to ensure your artwork lasts
                  for generations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-neutral-900 mb-2">
                  Do you offer framing services?
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  Yes, professional framing is available as an add-on service. I work with trusted
                  framers to provide museum-quality framing options that complement and protect your
                  artwork.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-neutral-900 mb-2">
                  What is your revision policy?
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  Most services include multiple revision rounds. I provide digital previews at key
                  stages to ensure you're completely satisfied before finalizing the artwork.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
