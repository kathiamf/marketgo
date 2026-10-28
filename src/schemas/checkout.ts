import { z } from 'zod';
import { parseMoney } from '@/utils/money';

export function makeCheckoutSchema(total: number) {
  return z
    .object({
      street: z.string().trim().min(3, 'Informe a rua'),
      number: z
        .string()
        .trim()
        .min(1, 'Informe o número')
        .max(10, 'Máximo de 10 caracteres'),
      neighborhood: z.string().trim().min(2, 'Informe o bairro'),
      complement: z.string().trim().max(60, 'Máximo de 60 caracteres'),
      payment: z.enum(['pix', 'card', 'cash']),
      changeFor: z.string(),
    })
    .superRefine((data, context) => {
      if (data.payment !== 'cash' || data.changeFor.trim() === '') return;
      const value = parseMoney(data.changeFor);
      if (Number.isNaN(value) || value <= 0) {
        context.addIssue({
          code: 'custom',
          path: ['changeFor'],
          message: 'Valor inválido',
        });
      } else if (value < total) {
        context.addIssue({
          code: 'custom',
          path: ['changeFor'],
          message: 'O troco deve cobrir o total do pedido',
        });
      }
    });
}

export type CheckoutFormData = z.infer<ReturnType<typeof makeCheckoutSchema>>;
