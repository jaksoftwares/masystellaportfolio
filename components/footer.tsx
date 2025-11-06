import { Mail, Phone, MapPin, Palette } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-white rounded-lg">
                <Palette className="h-5 w-5 text-neutral-900" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white leading-tight">
                  Stella Arts
                </span>
                <span className="text-xs text-neutral-400">by MaryStella Knight</span>
              </div>
            </div>
            <p className="text-sm text-neutral-400 max-w-md">
              Professional artist and journalist specializing in portrait, landscape, and nature drawings.
              Bringing stories to life through pencil and lens.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services & Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>info@stellaarts.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>+254 (0) 700 000 000</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">
            <p>
              &copy; {currentYear} Stella Arts by MaryStella Knight. All rights reserved.
            </p>
            <p className="mt-2 md:mt-0">
              Crafted with passion and precision
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
