import * as z from 'zod';

const clientSchema = z.object({
  name: z.string().min(1, 'O campo Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  x: z.coerce
    .number({ required_error: 'O campo X é obrigatório' })
    .int('X precisa ser inteiro'),
  y: z.coerce
    .number({ required_error: 'O campo Y é obrigatório' })
    .int('Y precisa ser inteiro')
});

export { clientSchema };
