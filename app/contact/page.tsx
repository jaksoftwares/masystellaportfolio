'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { supabase, type ContactInquiry } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactInquiry>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('contact_inquiries')
      .insert([formData]);

    setLoading(false);

    if (!error) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'info@stellaarts.com',
      link: 'mailto:info@stellaarts.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+254 (0) 700 000 000',
      link: 'tel:+254700000000',
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Nairobi, Kenya',
      link: null,
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-neutral-900 mb-6">Get in Touch</h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Ready to commission artwork or discuss a project? I'd love to hear from you.
            Fill out the form below or reach out directly using the contact information provided.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  Contact Information
                </h2>
                <p className="text-neutral-600 leading-relaxed mb-8">
                  Whether you have questions about services, pricing, or want to discuss a
                  custom project, I'm here to help bring your vision to life.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-neutral-900 rounded-lg">
                          <info.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 mb-1">
                            {info.title}
                          </h3>
                          {info.link ? (
                            <a
                              href={info.link}
                              className="text-neutral-600 hover:text-neutral-900 transition-colors"
                            >
                              {info.content}
                            </a>
                          ) : (
                            <p className="text-neutral-600">{info.content}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-0 shadow-md bg-neutral-50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-neutral-900 mb-3">Business Hours</h3>
                  <div className="space-y-2 text-sm text-neutral-600">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8 md:p-12">
                  {submitted ? (
                    <div className="text-center py-12">
                      <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
                      <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-neutral-600 mb-8">
                        Thank you for reaching out. I'll get back to you within 24-48 hours.
                      </p>
                      <Button
                        onClick={() => setSubmitted(false)}
                        variant="outline"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                          Send a Message
                        </h2>
                        <p className="text-neutral-600">
                          Fill out the form and I'll respond as soon as possible
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="h-12"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder="Commission Inquiry / Question / etc."
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell me about your project or inquiry..."
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 text-base"
                        size="lg"
                      >
                        {loading ? (
                          'Sending...'
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            What to Include in Your Message
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Project Details</h3>
              <p className="text-sm text-neutral-600">
                Describe what you're looking for - portrait, landscape, or other service
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Timeline</h3>
              <p className="text-sm text-neutral-600">
                Let me know when you need the project completed
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Budget</h3>
              <p className="text-sm text-neutral-600">
                Share your budget range to help me provide accurate options
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
