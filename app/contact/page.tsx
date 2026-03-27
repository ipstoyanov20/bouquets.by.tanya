'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, Phone, MapPin, Send, Heart } from 'lucide-react';
import { ref, push, set } from 'firebase/database';
import { db } from '@/lib/firebase';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Write to Firebase Realtime Database
      const messagesRef = ref(db, 'contact-messages');
      const newMessageRef = push(messagesRef);
      
      await set(newMessageRef, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        timestamp: Date.now(),
      });

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error saving message:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Свържи се с нас</h1>
          <p className="text-lg sm:text-xl text-gray-600 px-4">
            Имаш въпроси? Ще се радваме да ти помогнем!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <Input
                label="Име"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Въведи твоето име"
              />

              <Input
                label="Имейл"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@email.com"
              />

              <Input
                label="Телефон"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+359 888 123 456"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Съобщение
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent touch-manipulation"
                  placeholder="Напиши твоето съобщение тук..."
                />
              </div>

              {status === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                  <p className="text-sm sm:text-base text-green-800">Съобщението е изпратено успешно! Ще се свържем с теб скоро.</p>
                </div>
              )}

              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
                  <p className="text-sm sm:text-base text-red-800">Възникна грешка. Моля, опитай отново.</p>
                </div>
              )}

              <Button type="submit" size="lg" className="w-full touch-manipulation" disabled={isSubmitting}>
                <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {isSubmitting ? 'Изпраща се...' : 'Изпрати съобщение'}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Информация за контакт</h2>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start">
                  <div className="shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Имейл</h3>
                    <a
                      href="mailto:info@bouquetsbytanya.bg"
                      className="text-sm sm:text-base text-gray-600 hover:text-rose-600 transition-colors break-all"
                    >
                      info@bouquetsbytanya.bg
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Телефон</h3>
                    <a
                      href="tel:+359886611719"
                      className="text-sm sm:text-base text-gray-600 hover:text-rose-600 transition-colors"
                    >
                      +359 886 611 719
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Адрес</h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      ул. Д-р Атанас Москов 7, София 1715
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-rose-50 rounded-xl p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Работно време</h3>
              <div className="space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-600">
                <p>Понеделник - Петък: 9:00 - 18:00</p>
                <p>Събота: 10:00 - 16:00</p>
                <p>Неделя: Почивен ден</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl p-6 sm:p-8 text-white shadow-lg border-2 border-rose-400">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur rounded-full flex-shrink-0">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Специални поръчки</h3>
              </div>
              <p className="text-white/95 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                Искаш букет с определени цветове? Специална форма или размер? 
                Ние реализираме твоята визия!
              </p>
              <div className="bg-white/20 backdrop-blur rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                <p className="text-xs sm:text-sm font-semibold mb-2">Можем да създадем:</p>
                <ul className="space-y-1 text-xs sm:text-sm text-white/95">
                  <li>• Букети в твоите любими цветове</li>
                  <li>• Персонализиран размер и форма</li>
                  <li>• Комбинация от различни цветя</li>
                  <li>• Тематични букети за специални поводи</li>
                </ul>
              </div>
              <p className="text-white/90 text-xs sm:text-sm font-medium">
                Свържи се с нас директно по телефона или имейл - ще се радваме да реализираме твоята идея!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
