import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

/**
 * Production-ready footer component with:
 * - WCAG compliant contrast ratios
 * - Clean, flat design (no artifacts)
 * - Responsive grid layout
 * - Proper visual hierarchy
 */
export function Footer() {
  return (
    <footer className="relative bg-gray-950 text-white mt-auto">
      {/* Visual separator from main content */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-rose-500/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main footer content - 4 column grid on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
          
          {/* Brand Section - Takes 2 columns on large screens */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
              bouquets.by.tanya
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4 sm:mb-6 max-w-sm">
              Изкуствени цветни букети от висококачествени материали.
              Перфектен подарък за всеки повод
            </p>

            <div className="mt-3 flex items-center gap-3">
              <span className="text-sm text-gray-300">Доверие от щастливи клиенти</span>
              <img src="/econt-logo.png" alt="Econt Logo" className="inline-block h-6" />
            </div>

            <div className="flex items-center space-x-4 mt-4">
              <a
                href="https://www.instagram.com/_bouquets.by.taniaa?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-rose-400 transition-colors duration-200 touch-manipulation"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">
              Бързи връзки
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/products" 
                  className="text-gray-300 hover:text-rose-400 transition-colors duration-200 text-sm inline-block"
                >
                  Продукти
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-300 hover:text-rose-400 transition-colors duration-200 text-sm inline-block"
                >
                  За нас
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-300 hover:text-rose-400 transition-colors duration-200 text-sm inline-block"
                >
                  Контакти
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links Section */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">
              Информация
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/privacy" 
                  className="text-gray-300 hover:text-rose-400 transition-colors duration-200 text-sm inline-block"
                >
                  Политика за поверителност
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-gray-300 hover:text-rose-400 transition-colors duration-200 text-sm inline-block"
                >
                  Условия за ползване
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">
              Контакти
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <Mail className="w-5 h-5 mr-3 mt-0.5 shrink-0 text-gray-400 group-hover:text-rose-400 transition-colors duration-200" />
                <a 
                  href="mailto:info@bouquetsbytanya.bg" 
                  className="text-gray-300 hover:text-rose-400 transition-colors duration-200 text-sm break-all"
                >
                  info@bouquetsbytanya.bg
                </a>
              </li>
              <li className="flex items-start group">
                <Phone className="w-5 h-5 mr-3 mt-0.5 shrink-0 text-gray-400 group-hover:text-rose-400 transition-colors duration-200" />
                <a 
                  href="tel:+359888123456" 
                  className="text-gray-300 hover:text-rose-400 transition-colors duration-200 text-sm"
                >
                  +359 886 611 719
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-0.5 shrink-0 text-gray-400" />
                <span className="text-gray-300 text-sm">София, България</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} bouquets.by.tanya. Всички права запазени.
          </p>
        </div>
      </div>
    </footer>
  );
}
