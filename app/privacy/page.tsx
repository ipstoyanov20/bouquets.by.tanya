export const metadata = {
  title: 'Политика за поверителност - bouquets.by.tanya',
  description: 'Политика за защита на личните данни',
};

export default function PrivacyPage() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Политика за поверителност</h1>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-gray-600">
            Последна актуализация: 21 декември 2025
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Въведение</h2>
            <p className="text-gray-700">
              bouquets.by.tanya ("ние", "нас", "нашият") се ангажира да защитава вашата поверителност.
              Тази политика за поверителност обяснява как събираме, използваме, съхраняваме и защитаваме
              вашата лична информация, когато използвате нашия уебсайт.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Информация, която събираме</h2>
            <p className="text-gray-700 mb-3">Ние събираме следните видове информация:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Лична информация (име, имейл адрес, телефонен номер)</li>
              <li>Адрес за доставка</li>
              <li>Информация за плащане (обработена сигурно чрез Stripe)</li>
              <li>История на поръчките</li>
              <li>Информация за използването на уебсайта (чрез cookies)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Как използваме вашата информация</h2>
            <p className="text-gray-700 mb-3">Използваме събраната информация за:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Обработка и изпълнение на вашите поръчки</li>
              <li>Комуникация относно вашите поръчки</li>
              <li>Подобряване на нашите услуги</li>
              <li>Изпращане на маркетингови съобщения (само с вашето съгласие)</li>
              <li>Спазване на законови изисквания</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Защита на данните</h2>
            <p className="text-gray-700">
              Ние използваме индустриални стандарти за сигурност, за да защитим вашата лична информация.
              Всички плащания се обработват сигурно чрез Stripe, сертифициран PCI DSS Level 1 доставчик.
              Ние никога не съхраняваме пълни данни за вашата кредитна карта на нашите сървъри.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Споделяне на информация</h2>
            <p className="text-gray-700">
              Ние не продаваме, не търгуваме и не прехвърляме вашата лична информация на трети страни,
              освен когато е необходимо за изпълнение на вашите поръчки (напр. куриерски услуги) или
              когато е изискано от закона.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Вашите права</h2>
            <p className="text-gray-700 mb-3">Вие имате право да:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Получите достъп до вашите лични данни</li>
              <li>Коригирате неточна информация</li>
              <li>Изтриете вашите данни</li>
              <li>Възразите срещу обработката на вашите данни</li>
              <li>Оттеглите съгласието си за маркетингови съобщения</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies</h2>
            <p className="text-gray-700">
              Нашият уебсайт използва cookies, за да подобри вашето изживяване. Вие можете да
              контролирате използването на cookies чрез настройките на вашия браузър.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Промени в политиката</h2>
            <p className="text-gray-700">
              Запазваме правото да актуализираме тази политика за поверителност по всяко време.
              Ще ви уведомим за значителни промени чрез имейл или чрез видимо съобщение на нашия уебсайт.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Контакти</h2>
            <p className="text-gray-700">
              За въпроси относно тази политика за поверителност, моля свържете се с нас на:
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Имейл:</strong> info@bouquetsbytanya.bg<br />
              <strong>Телефон:</strong> +359 888 123 456
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
