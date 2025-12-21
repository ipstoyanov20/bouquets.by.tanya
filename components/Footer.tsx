import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">bouquets.by.tanya</h3>
            <p className="text-gray-400 mb-4">
              Изкуствени цветни букети от висококачествени материали.
              Перфектен подарък за всеки повод, който остава вечен.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose-400 transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose-400 transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Бързи връзки</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="hover:text-rose-400 transition-colors">
                  Продукти
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-rose-400 transition-colors">
                  За нас
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-rose-400 transition-colors">
                  Контакти
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-rose-400 transition-colors">
                  Политика за поверителност
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-rose-400 transition-colors">
                  Условия за ползване
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Контакти</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-2 mt-0.5 shrink-0" />
                <a href="mailto:info@bouquetsbytanya.bg" className="hover:text-rose-400 transition-colors">
                  info@bouquetsbytanya.bg
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-2 mt-0.5 shrink-0" />
                <a href="tel:+359888123456" className="hover:text-rose-400 transition-colors">
                  +359 888 123 456
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-0.5 shrink-0" />
                <span>София, България</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} bouquets.by.tanya. Всички права запазени.</p>
        </div>
      </div>
    </footer>
  );
}
