import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';


interface OrderConfirmationData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  total: number;
  items: any[];
  waybillNumber?: string;
  address: string;
}

export const sendOrderConfirmationEmail = async (data: OrderConfirmationData) => {
  const { 
    orderId, 
    customerName, 
    customerEmail, 
    total, 
    items, 
    waybillNumber, 
    address 
  } = data;

  if (!customerEmail || customerEmail.trim() === '') {
    console.warn(`Skipping email confirmation for order #${orderId} - no email address provided.`);
    return { success: true, message: 'No email provided' };
  }

  try {
    const result = await resend.emails.send({
      from: `Bouquets by Tanya <${FROM_EMAIL}>`,
      to: customerEmail,
      subject: `Потвърждение на поръчка #${orderId}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h1 style="color: #00599c; text-align: center;">Благодарим Ви за поръчката!</h1>
          <p>Здравейте, ${customerName},</p>
          <p>Вашата поръчка с номер <strong>#${orderId}</strong> беше приета успешно.</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Детайли на поръчката:</h3>
            <ul style="list-style: none; padding: 0;">
              ${items.map(item => `
                <li style="padding: 10px 0; border-bottom: 1px solid #eee;">
                  ${item.name} x ${item.count || item.quantity} - <strong>${item.totalPrice.toFixed(2)} BGN</strong>
                </li>
              `).join('')}
            </ul>
            <p style="text-align: right; font-size: 1.2em; font-weight: bold; margin-top: 15px;">
              Общо: ${total.toFixed(2)} BGN
            </p>
          </div>

          <div style="margin: 20px 0; padding: 15px; background-color: #eef6fc; border-radius: 8px; border-left: 4px solid #00599c;">
             <h3 style="margin-top: 0; color: #00599c;">Информация за доставка:</h3>
             <p style="margin-bottom: 5px;"><strong>Адрес:</strong> ${address}</p>
             ${waybillNumber ? `<p><strong>Товарителница (Еконт):</strong> <span style="color: #00599c; font-weight: bold;">${waybillNumber}</span></p>` : ''}
             <p style="font-size: 0.9em; color: #555; margin-top: 10px;">
               Плащането ще бъде извършено чрез <strong>Наложен платеж</strong> при доставка от куриера на Еконт.
             </p>
          </div>

          <p style="color: #666; font-size: 0.9em; text-align: center; margin-top: 30px;">
            Ако имате въпроси, не се колебайте да се свържете с нас на тел. +359 886 611 719.
          </p>
          <p style="color: #666; font-size: 0.9em; text-align: center;">
            С уважение,<br>
            <strong>Екипът на Букети от Таня</strong>
          </p>
          <div style="border-top: 1px solid #eee; margin-top: 20px; padding-top: 20px; color: #999; font-size: 0.8em; text-align: center;">
            Bouquets by Tanya • София, България • ж.к. Младост 4, ул. Д-р Атанас Москов
          </div>
        </div>
      `,
    });

    if (result.error) {
      console.error('Resend SDK returned an error:', result.error);
      return { success: false, error: result.error };
    }

    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error('Resend email error:', error);
    return { success: false, error };
  }
};
