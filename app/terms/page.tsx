export const metadata = {
  title: 'Условия за ползване - bouquets.by.tanya',
  description: 'Общи условия за ползване на услугата',
};

export default function TermsPage() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Условия за ползване</h1>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-gray-600">
            Последна актуализация: 21 декември 2025
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Приемане на условията</h2>
            <p className="text-gray-700">
              Като използвате уебсайта на bouquets.by.tanya, вие се съгласявате да спазвате
              тези условия за ползване. Ако не сте съгласни с тези условия, моля не използвайте
              нашия уебсайт.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Продукти и цени</h2>
            <p className="text-gray-700 mb-3">
              Ние се стремим да предоставим точна информация за нашите продукти и цени, но:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Цветовете на продуктите може да се различават леко от изображенията поради настройките на екрана</li>
              <li>Запазваме правото да променяме цените без предизвестие</li>
              <li>Всички цени са в български лева (BGN) и включват ДДС</li>
              <li>Наличността на продуктите може да се променя</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Поръчки</h2>
            <p className="text-gray-700 mb-3">
              Когато правите поръчка:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Вие представяте оферта за закупуване на продукти</li>
              <li>Ще получите имейл потвърждение за вашата поръчка</li>
              <li>Запазваме правото да откажем или отменим поръчки</li>
              <li>Поръчките се обработват след потвърждаване на плащането</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Плащане</h2>
            <p className="text-gray-700">
              Всички плащания се обработват сигурно чрез Stripe. Приемаме кредитни и дебитни карти,
              както и Apple Pay и Google Pay. Вашата информация за плащане не се съхранява на
              нашите сървъри.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Доставка</h2>
            <p className="text-gray-700 mb-3">
              Условия за доставка:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Доставяме на територията на България</li>
              <li>Срокът за доставка е 2-5 работни дни</li>
              <li>Цената на доставката зависи от адреса и теглото</li>
              <li>Ще получите проследяващ номер след изпращане</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Връщане и замяна</h2>
            <p className="text-gray-700 mb-3">
              Политика за връщане:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Имате право да върнете продукта в рамките на 14 дни</li>
              <li>Продуктът трябва да бъде в оригинална опаковка и състояние</li>
              <li>Свържете се с нас за инструкции за връщане</li>
              <li>Възстановяването се извършва в рамките на 7-14 работни дни</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Интелектуална собственост</h2>
            <p className="text-gray-700">
              Всички изображения, текстове, дизайни и друго съдържание на този уебсайт са собственост
              на bouquets.by.tanya и са защитени от авторско право. Забранено е копирането,
              разпространението или използването без писмено разрешение.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Ограничение на отговорността</h2>
            <p className="text-gray-700">
              bouquets.by.tanya не носи отговорност за непреки, случайни или последващи щети,
              произтичащи от използването на нашия уебсайт или продукти, освен когато е изискано от закона.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Промени в условията</h2>
            <p className="text-gray-700">
              Запазваме правото да актуализираме тези условия по всяко време. Продължавайки да
              използвате уебсайта след промени, вие приемате новите условия.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Приложимо право</h2>
            <p className="text-gray-700">
              Тези условия се регулират от законодателството на Република България. Всички спорове
              ще се решават в компетентните български съдилища.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Контакти</h2>
            <p className="text-gray-700">
              За въпроси относно тези условия, моля свържете се с нас:
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Имейл:</strong> info@bouquetsbytanya.bg<br />
              <strong>Телефон:</strong> +359 888 123 456<br />
              <strong>Адрес:</strong> София, България
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
